<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
  <p align="center">

## Description
 
基于 [Nest](https://github.com/nestjs/nest) 快速启动项目，包含了项目开发常用功能模块。

## 命令

```bash
$ npm run start       # development
$ npm run start:dev   # watch mode
$ npm run pm2         # 正式环境

$ npx nest g module name     # 创建 module
$ npx nest g controller name # 创建 controller
$ npx nest g service name    # 创建 service
```

## 模块

### Config

配置分类两类，静态配置和动态配置

#### 静态配置

.env 文件定义的配置，会根据环境自动加载，重启服务才能生效

#### 动态配置

记录在数据库中的配置，提供了接口进行修改，并且实时生效，适用于业务运营过程中需要修改的配置，例如订单金额上限、控制功能开关

### Helper

全局模块，工具类方法都封装在该模块中，便于其他模块调用

- httpService: nest 提供的基于 Axios 的请求库，在这个基础上增加了日志记录功能，并对外提供 get,post,axios 方法

### Auth

鉴权模块

## 其他

### JWT

### 错误/异常

### 接口协议

### 认证

## 开发

#### 路径别名

见 `tsconfig.json`