// 代码清单 2-17 在一个简单的程序中实现串行化流程控制
const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';
// 确保包含RSS预定源URL列表的文件存在
function checkForRSSFile () {
  fs.exists(configFilename, (exists) => {
    if (!exists)
      return next(new Error(`Missing RSS file: ${configFilename}`));
    next(null, configFilename);
  });
}

// 读取并解析包含预定源URL的文件
function readRSSFile (configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err);
    // 将预定源URL列表转换成字符串，然后分隔成一个数组
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n');
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

// 向选定的预定源发送HTTP请求以获取数据
function downloadRSSFeed (feedUrl) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode != 200)
      return next(new Error('Abnormal response status code'));
    next(null, body);
  });
}

// 将预定源数据解析到一个条目数组中
function parseRSSFeed (rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parserComplete(rss);
  if (!handler.dom.items.length) 
    return next(new Error('No RSS items found'));
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

// 把所有要做的任务按执行顺序添加到一个数组中
const tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
];

// 负责执行任务的next函数
function next (err, result) {
  if (err) throw err;
  // 从任务中取出下个任务
  const currentTask = tasks.shift();
  if (currentTask) {
    // 执行当前任务
    currentTask(result);
  }
}

// 开始任务的串行化执行
next();
