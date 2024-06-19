FROM node:lts as dependencies
WORKDIR /crm-service-re
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy Prisma schema and generate Prisma client
COPY ./prisma ./prisma
RUN npx prisma generate

FROM node:lts as builder
WORKDIR /crm-service-re
COPY . .
COPY --from=dependencies /crm-service-re/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /crm-service-re
ENV NODE_ENV production

COPY --from=builder /crm-service-re/public ./public
COPY --from=builder /crm-service-re/package.json ./package.json
COPY --from=builder /crm-service-re/.next ./.next
COPY --from=builder /crm-service-re/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]