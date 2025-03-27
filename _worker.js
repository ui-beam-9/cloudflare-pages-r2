export default {
    async fetch(request, env) {
      try {
        // 处理 OPTIONS 请求
        if (request.method === 'OPTIONS') {
          const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3000',
          };
          return new Response('', { status: 204, headers });
        }

        let url = new URL(request.url);
        const path = url.pathname.replace(/^\//, '');
        
        // 如果是根路径，返回 index.html
        if (!path) {
          return env.ASSETS.fetch(request);
        }
        
        // 处理文件请求
        url.hostname = 'pub-8a38c9993bf84440ad2a326d442b4635.r2.dev';
        let new_request = new Request(url, request);
        
        const response = await fetch(new_request);
        
        // 检查响应状态
        if (!response.ok) {
          console.error(`R2 请求失败: ${response.status} ${response.statusText}`);
          return new Response(`R2 请求失败: ${response.status}`, { 
            status: response.status,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, HEAD',
              'Access-Control-Allow-Headers': '*',
            }
          });
        }
        
        // 克隆响应以添加 CORS 头
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Access-Control-Allow-Origin', '*');
        newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD');
        newResponse.headers.set('Access-Control-Allow-Headers', '*');
        
        return newResponse;
      } catch (error) {
        console.error('Worker 执行错误:', error);
        return new Response(`内部错误: ${error.message}`, { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD',
            'Access-Control-Allow-Headers': '*',
          }
        });
      }
    },
  };