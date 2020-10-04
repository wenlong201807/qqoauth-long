var express = require('express');
const querystring = require('querystring');
var router = express.Router();
const AppId = '101494423'; // 需要自己真实的
const appKey = "4129ba38845f4784484eb00eb877068f";// 需要自己真实的
const redirect_uri = 'http://123.123.123.123/user/callback';// 需要自己真实的
const logger = require('debug')('qqoauth:user');
const state = Date.now();
router.get('/login', function (req, res, next) {
  let grantUrl = 'https://graph.qq.com/oauth2.0/authorize?';
  let options = {
    response_type: 'code',//响应类型 固定为code
    client_id: AppId, //客户端的ID，这个ID是由QQ授权服务器分配的
    redirect_uri,
    state,
    scope: 'get_user_info,list_album'
  }
  let query = querystring.stringify(options);
  logger('query', query);
  grantUrl += query;
  logger('grantUrl', grantUrl);
  res.render('login', { title: '登录', grantUrl });
});
//http://front.zhuwenlong.cn/user/callback?code=9A5F06AF&state=test
router.get('/callback', function (req, res) {
  let { code, state } = req.query;
  res.send(code);
});

module.exports = router;
