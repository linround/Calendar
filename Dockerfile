FROM node:18
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
# 将build文件内容复制到html文件下
COPY --from=0 /app/dist /usr/local/nginx/html
# 这里可以用来在项目去配置nginx文件
# 因为我是在linux服务器上配置了nginx，然后使用命令将docker中的nginx配置项，映射到了外部来处理；
# 所以不需要从我的前端项目中去处理
# COPY nginx.conf /etc/nginx/nginx.conf
LABEL maintainer = "usha.mandya@docker.com"
