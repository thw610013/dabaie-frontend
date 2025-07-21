const { generateService } = require("@umijs/openapi");

generateService({
    // 配置我们自己指定的 axios 来发送请求
    requestLibPath: "import request from '@/libs/request'",
    //自己后端地址
    schemaPath: "http://localhost:8101/api/v2/api-docs",
    //生成代码地址
    serversPath: "./src",
});
