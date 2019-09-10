// 代码请单 2-18 在一个简单的程序中实现并行化流程控制
const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
let completedTasks = 0;

function checkIfComplete () {
  completedTasks++;
  if (completedTasks === tasks.length) {
    // 当所有任务全部完成后，列出文件中用到的每个单词以及用了多少次
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`);
    }
  }
}

function addWordCount (word) {
  wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function countWordsInText (text) {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();

  // 对文本中出现的单词计数
  words
    .filter(word => word)
    .forEach(word => addWordCount(word));
}

// 得出text目录中的文件列表
fs.readdir(filesDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    // 定义处理每个文件的任务，每个任务中都会调用一个异步读取文件的函数并对文件中使用的单词计数
    const task = (file => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(`${filesDir}/${file}`);
    tasks.push(task);
  });
  tasks.forEach(task => task());
});
