<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
  <p align="center">

## Description
 
基于 [Nest](https://github.com/nestjs/nest) 快速启动项目，包含了项目开发常用功能模块和最佳实践。

## 命令

```bash
$ npm run start       # development
$ npm run start:dev   # watch mode
$ npm run pm2         # 正式环境

$ npx nest g module name     # 创建 module
$ npx nest g controller name # 创建 controller
$ npx nest g service name    # 创建 service
```

## 规范

### 目录结构

```
.
├── README.md
├── development.env                   // 开发环境静态配置
├── nest-cli.json
├── package.json
├── pm2.json                          // pm2 配置
├── production.env                    // 生产环境静态配置
├── src
│   ├── common                        // 公共组件目录
│   │   ├── allException.filter.ts    // 所有异常过滤器
│   │   ├── error.exception.ts        // 业务异常类
│   │   └── transform.interceptor.ts  // 响应体格式转换拦截器
│   ├── main.ts                       // 入口文件，创建服务
│   ├── modules                       // 模块目录
│   │   ├── app                       // 根应用模块
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   └── app.service.ts
│   │   ├── auth                      // 权限校验模块
│   │   │   ├── auth.controller.ts    // 控制器
│   │   │   ├── auth.interface.ts     // typescript 接口声明
│   │   │   ├── auth.module.ts        // 模块定义文件
│   │   │   ├── auth.service.ts       // 服务层
│   │   │   ├── dto                   // 参数对象目录
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── cache                     // 缓存模块
│   │   │   └── ...
│   │   ├── config                    // 配置模块
│   │   │   └── ...
│   │   ├── database                  // 数据库模块
│   │   │   └── ...
│   │   ├── helper                    // 辅助方法模块
│   │   │   └── ...
│   │   ├── mq                        // 消息队里模块
│   │   │   └── ...
│   │   └── user                      // 用户模块
│   │       └── ...
│   └── utils                         // 工具方法
├── static                            // 静态文件目录
├── test                              // 单元测试目录
│   └── ...
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

Nest.js 是基于模块的方式进行依赖管理的，所以以模块为单位组织代码，一个功能模块相关的代码都在一个目录下，而不是一个目录包含所有模块某类文件，例如不再用 controllers 目录去放所有模块的 controller 文件，而是每个 controller 都自行放到对应的模块目录下。这样的好处是功能划分更加清新，不同功能的代码不再纠缠在一起，当需要调整一个模块的时候，更加方便。

独立于模块的文件可以用跟 modules 并列的目录去保存，例如 utils 目录，保存的时候各类工具方法，是解决通用问题的，没有功能模块的属性，不需要依赖注入。

common 目录是保存所有公共中间件、拦截器、管道等，与模块相关的中间件和拦截器依然放到模块目录中。

### 控制器与服务

controller 负责处理请求和响应，不会直接和数据层接触，而是调用一个或多个 service 去完成想要实现的业务功能。service 层与数据层进行交互，向上提供方法，service 的方法尽可能小，只完成一个功能。

**参数校验**
使用基于类的参数校验方式，并通过管道装饰器完成验证

**获取 Jwt Payload**
被 `@UseGuards(AuthGuard())` 装饰的控制器，代表需要 Jwt 校验，通过校验后，可以用 @Jwt() 注解拿到 Jwt 的 Payload

```ts
class LoginDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;
}

@Controller()
export class AppController {
  ...
  @UseGuards(AuthGuard())
  @Post()
  async getHello(@Body() body: IndexBodyDto, @Jwt() jwt: JwtPayload): Promise<any> {
    ...
    return jwt
  }
  ...
}
```

### 错误/异常 (待定)

全局范围添加了异常过滤器（src/common/allException.filter.ts），会拦截所有异常，格式化响应体。
对于业务逻辑类异常，封装了 ErrorException 异常类，继承于框架自带的 HttpException。ErrorException 构造方法接受固定格式的错误码对象，错误码对象需要在 src/common/error.exception.ts 文件中集中定义。使用示例如下：

```js
// 业务逻辑中抛出异常
throw new ErrorException('USER_NOT_FOUND', '用户不存在')
```

### 接口协议

```js
{
  code: 0, // 0 或者空字符串则代表成功
  msg: "成功",
  data: {...},
  t: 1594727565012,
  traceID: '45c076e9-faf9-4f05-95f2-0e21eca615a8'
}
```

### 日志

#### 配置

.env 中的 LOG_OUTPUT 可以配置日志输出方式，默认 console，支持 file
file 模式会通过 log4j 工具按天输出到 logs 目录中，如果是通过 pm2 启动服务，记得配置 LOG4J_PM2 = 1。

#### 日志ID

基于 winston 的日志功能，并用 `nest-winston` 重新实现了 NestJs 自带的日志 Service，在不方便进行依赖注入的地方，也可以直接引用 `src/common/logger` 中的方法。
了便于日志查找，同一个请求产生的多条日志都会生成相同的日志ID（tractID）。

> 可以参考：https://blog.goncharov.page/nodejs-logging-made-right

## 系统模块

### Config

配置分类两类，静态配置和动态配置

#### 静态配置

.env 文件定义的配置，该文件不在版本库中，不依赖环境参数，示例配置参考 `doc/sample.env` 文件

#### 动态配置

记录在数据库中的配置，提供了接口进行修改，并且实时生效，适用于业务运营过程中需要修改的配置，例如订单金额上限、控制功能开关等。

### Database

数据库注册模块

#### Sequelize

支持 TypeScript 的 ORM 库. 支持 MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana, WebSQL 等数据库。

> 官方推荐的是 typeorm，实际使用发现不是很成熟，对复杂的 sql 支持不够完善，提供两个模式反而很迷惑

**生成实体**

sequelize 需要提前给每个表创建实体类，手动创建比较繁琐，可以通过 `npm run model` 命令直接同步数据库表结构自动创建实体类。
> 数据库连接配置可以在 package.json 文件对应的 script 中修改

### Helper

全局模块，工具类方法都封装在该模块中，便于其他模块调用

- httpService: nest 提供的基于 Axios 的请求库，在这个基础上增加了日志记录功能，并对外封装 get,post,axios 方法
- logger: 日志

### Auth

鉴权模块

#### JWT

默认采用 Jwt 作为身份认证方式，因为是无状态的，很适合跨域、分布式等场景。

缺点：jwt token 签发后无法废止，存在被恶意盗用的风险。

#### 权限控制 (RABC)

RBAC（基于角色的权限控制）是企业软件常用的权限管理技术，提供了开箱即用的 RBAC 鉴权功能，依赖 mysql 权限相关表。
默认支持 API（接口） 类型和 MENU（菜单）权限类型，对于 API 权限支持通过装饰器的方式编写鉴权逻辑，非常方便。

**API 鉴权使用方式**

1. 注册鉴权守卫，默认注册在根模块
   ```ts
    providers: [
      {
        // 全局注册 RBAC 权限守卫, 配合 Permission 装饰器使用
        provide: APP_GUARD,
        useClass: PermissionGuard,
      },
      ...
    ],
   ```
2. 在需要鉴权的路由上用 `@Permission()` 装饰器声明权限，执行方法前鉴权守卫通过装饰器拿到需要的权限code，再去查找用户的 API 类型的权限，并判断声明的权限是否都拥有，如果没有则返回 ForbidException 异常
   需要自行实现鉴权逻辑 `src/modules/auth/permission.guard.ts`
   ```ts
    @Get('needPermission')
    @Permission('DEMO')   // 权限声明装饰器
    @ApiOperation({summary: '角色权限守卫demo', tags: ['用户鉴权']})
    async needPermission(): Promise<any> {
      return 'success'
    }
   ```

### Cache

缓存模块，基于 redis，且提供了一个对外的 command 方法用于执行任意 redis 命令。
也可以考虑直接用官方提供的装饰器进行接口级别的缓存

### 静态文件

静态文件目录 `static`，请求地址前缀为 `/static/`

html 文件建议在 Controller 中定义地址并返回，例如首页：

```ts
  @Get('/')
  async getHello(@Res() res: Response): Promise<any> {
    res.sendFile(path.resolve(__dirname, '..', '..', '..', 'static/index.html'))
  }
```

> 本项目并没有配置 hbs/ejs 等渲染引擎，因为现在大部分都是基于 React/Vue 开发的前后端分离的项目，不需要后端做服务端渲染。
> 如果的确需要做服务端渲染，建议用 next/nuxt 单独起服务 

## Docker

真的开发环境和生产环境提供了 Docker 支持，省去各种安装工作。也可以不使用。

### 开发

为了便于本地开发，项目支持通过 docker compose 快速创建 mysql 和 redis 服务。

**启动命令：**

```bash
docker-compose -f "docker-compose.yml" up -d
```

**默认暴露到宿主的端口**
- Mysql 3310
- Redis 6379

本地开发时 node 代码则没有用 docker 容器去跑，因为本地开发可能需要经常执行命令、重启服务等，用容器去跑有点多余。

#### 开发规范

##### 命名规范

1. 文件名： kebab-case (短横线命名)
2. 变量用： camelCase (驼峰命名)
3. 类、类型： PascalCase (帕斯卡命名)
4. 数据库字段： UnderScoreCase (下划线命名)

### 部署

提供了基于 Docker 部署方式，可以不需要安装相关环境，直接运行。

**构建生产环境镜像前准备**

- 由于 Docker 不通系统上网络会有些差别，请根据实际情况修改 .env 配置文件中 mysql，redis 等服务的连接地址。
- 下面提供的 Docker 相关命令可以根据实际需求修改
- logs 日志文件需要挂载到宿主机上，避免丢失

**构建和启动命令：**

```bash
# 构建镜像 (nestjs-start为镜像名称，可以自定义)
docker build -t nestjs-start . 

# 创建容器并挂载日志目录
docker run -p 8000:8000 -d -v {本地日志绝对路径}:/usr/src/app/logs nestjs-start

# 进入容器
docker exec -it {容器ID} /bin/bash
```

## 其他

### 代码生成

nest 提供的代码生成 cli 能减少写模板代码的工作

```bash
# 最后一个参数 modules 表示模块所在目录
npx nest g -h # 帮助
npx nest g module user modules       # 生成 User 模块
npx nest g controller user modules   # 生成 User 控制器
npx nest g service user modules      # 生成 User Service
```

Sequelize model 生成工具，可以直接根据数据库表结构在 src/model 目录创建对应的 model 文件，大大节省 model 定义工作

```bash
npm run model
```

### 路径别名

见 `tsconfig.json`
