# model设计
- 新增文件/文件夹, 事件触发
- 删除文件/文件夹, 事件触发
- 改名文件/文件夹, 事件触发

# 其他设计参考
- 在使用UI的时候使用了适配器模式, 因为以后可能会切换到更合适的UI组件, 所以对UI使用了适配器模型

# file-tree 需求
- 图标表示文件类型, 插件可以自定义图标
- 自定义文件筛选规则
- 自定义排序规则

# 暂不考虑
- 文本颜色区分git状态


# 参考资料
- [Windows平台下如何使用node.js显示系统盘符](http://forkme.info/windows-nodejs-show-system-letter/)
  如果打算以后自己重写file-dialog, 用这里提供的技巧找到盘符
- [File dialogs](https://github.com/nwjs/nw.js/wiki/File-dialogs)
  nw本身就支持, 当然没必要自己写