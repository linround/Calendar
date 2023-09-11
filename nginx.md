# nginx 可执行程序
```text
 路径：/usr/local/nginx/sbin
```

# 前端代码资源
```text
usr/local/nginx/html
```
# openssl路径
```text
openssl=/root/openssl-1.1.0f
```
# nginx 配置路径
```text
 /usr/local/nginx/conf
```

# nginx 相关模块
```text
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-file-aio --with-http_realip_module --with-http_gzip_static_module --with-openssl=/root/openssl-1.1.0f
```


## 网站相关
```text
# me.ucalendar.cn
# 资源路径：/usr/local/me
# three.ucalendar.cn
# 资源路径：/usr/local/threejs
```


#如何配置http2
注意事项
- 并且需要openssl库的版本在1.0.2以上编译。1.要开启HTTP/2协议支持，需要在nginx 1.10以上版本并且需要openssl库的版本在1.0.2以上编译。
- http2.0只支持开启了https的网站。
## 升级openssl

### 下载最新的openssl
```text
wget https://www.openssl.org/source/openssl-1.1.0f.tar.gz
tar xzf openssl-1.1.0f.tar.gz
cd openssl-1.1.0f
./config --prefix=/usr/local/openssl
make && make install
```

### 替换旧版本库
```text
mv /usr/bin/openssl  /usr/bin/openssl.old
mv /usr/include/openssl /usr/include/openssl.old
ln -s /usr/local/openssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/openssl/include/openssl /usr/include/openssl
#链接新库文件
ln -s /usr/local/openssl/lib/libssl.so /usr/local/lib64/libssl.so
ln -s /usr/local/openssl/lib/libcrypto.so /usr/local/lib64/libcrypto.so
#检查更新后的openssl依赖库是否是1.1.0f
strings /usr/local/lib64/libssl.so | grep OpenSSL
#显示结果表明已升级到最新版本链接库
OpenSSL 1.1.0f  25 May 2017

#配置openssl库文件的搜索路径
echo '/usr/local/openssl/lib' >> /etc/ld.so.conf
#使修改后的搜索路径生效
ldconfig -v
#查看openssl版本，结果显示升级成功
openssl version
OpenSSL 1.1.0f  25 May 2017
```

### 编译nginx

```text
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-file-aio --with-http_realip_module --with-http_gzip_static_module --with-openssl=/root/openssl-1.1.0f

make && make install
```
### 在nginx.conf中配置http2
```text
listen       443 ssl http2;
```
### 重启nginx
```text
# 大概一分钟后即可生效
nginx -s reload
```


# 阿里云相关
## 短信服务
```text
AccessKey ID:
LTAI5t9DYP6t5KbC1jDF23pK

AccessKey Secret:
jMt34PEcv1bBRkNbC9LZdc1TEGOekR

```
### AccessKey
```text
AccessKey ID:
LTAI5tCiU4oaKpDUekTFr1h7


AccessKey Secret:
AutoyaEBxs5o1ni0OE6GmGnz4xuwx0
```
