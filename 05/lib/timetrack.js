let qs = require('querystring');

// 发送html响应
exports.sendHtml = function(res, html) {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

// 解析HTTP POST数据
exports.parseReceivedData = function(req, cb) {
  let body = '';
  req.setEncoding('utf-8');
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    let data = qs.parse(body);
    cb(data);
  });
}

// 渲染简单的表单
exports.actionForm = function(id, path, label) {
  let html = '<form method="POST" action=" ' + path + '">' + 
    '<input type="hidden" name="id" value="' + id + '">' + 
    '<input type="submit" value="' + label + '" />' +
    '</form>';
  return html;
}

// 添加工作记录
exports.add = function(db, req, res) {
  exports.parseReceivedData(req, work => {
    db.query(
      'INSERT INTO work (hours, date, description)' +
      ' VALUES (?, ?, ?)',
      [work.hours, work.date, work.description],
      err => {
        if (err) throw err;
        exports.show(db, res);
      }
    )
  });
}

// 删除工作记录
exports.delete = function(db, req, res) {
  exports.parseReceivedData(req, function(work) {
    db.query(
      'DELETE FROM work WHERE id=?',
      [work.id],
      err => {
        if (err) throw err;
        exports.show(db, res);
      }
    );
  });
}

// 归档一条工作记录
exports.archive = function(db, req, res) {
  exports.parseReceivedData(req, function(work) {
    db.query(
      'UPDATE work SET archived=1 WHERE id=?',
      [work.id],
      function(err) {
        if (err) throw err;
        exports.show(db, res);
      }
    )
  });
}

// 获取工作记录
exports.show = function(db, res, showArchived) {
  let query = "SELECT * FROM work " +
  "WHERE archived=? " + 
  "ORDER BY date DESC";
  let archiveValue = showArchived ?  1 : 0;
  db.query(
    query,
    [archiveValue], 
    (err, rows) => {
      if (err) throw err;
      html = showArchived 
        ? ''
        : '<a href="/archived">Archived Work</a><br/>';
      html += exports.workHitlistHtml(rows);
      html += exports.workForHtml();
      exports.sendHtml(res, html);
    }
  )
}

exports.showArchived = function(db, res) {
  exports.show(db, res, true);
}

// 将工作记录渲染为HTML表格
exports.workHitlistHtml = function(rows) {
  let html = '<table>';
  for (let i in rows) {
    html += '<tr>';
    html += '<td>' + rows[i].date + '</td>';
    html += '<td>' + rows[i].hours + '</td>';
    html += '<td>' + rows[i].description + '</td>';
    if (!rows[i].archived) {
      html += '<td>' + exports.workArchiveFrom(rows[i].id) + '</td>';
    }
    html += '<td>' + exports.workDeleteFrom(rows[i].id) + '</td>';
    html += '</tr>';
  }
  html += '</table>';
  return html;
}

// 用来添加，归档，删除工作记录的HTML表单
exports.workForHtml = function() {
  let html = '<form method="POST" action="/">' +
    '<p>Date (YYYY-MM-DD):<br/><input name="date" type="text"></p>' +
    '<p>Hours worked:<br/><input name="hours" type="text"></p>' +
    '<p>Description:<br/>' +
    '<textarea name="description"></textarea></p>' +
    '<input type="submit" value="Add" />' +
    '</form>';
  return html;
}

// 渲染归档按钮表单
exports.workArchiveFrom = function(id) {
  return exports.actionForm(id, '/archive', 'Archive');
}

// 渲染删除按钮表单
exports.workDeleteFrom = function(id) {
  return exports.actionForm(id, '/delete', 'Delete');
}

