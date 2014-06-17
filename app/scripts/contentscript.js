'use strict';

$(function() {
    var storage = chrome.storage.local;
    storage.get(function(items) {

      var $private_entries = $('.private_entries');
      var $template_entries = $('<div/>').attr('class', 'private_entries');
      var $title = $('<h2/>').attr('class', 'title').text('テンプレート');
      var $table = $('<table/>').attr('class', 'drafts').append('<tbody/>');

      $(Object.keys(items)).each(function(index, title) {
        storage.get(title, function(template) {
          var $tr = $('<tr/>').attr('class', 'topix_entry');

          var $td_buttons = $('<td/>').attr('class', 'buttons');
          var $span_load = $('<span/>').attr('class', 'load');

          // Chrome Extentionのcontent_scriptでは自分で定義した関数を呼び出せないので、無理矢理書き込んでいる
          // template.bodyは改行コードが含まれるため、escapeしてデータを保存している。その為、.val()呼出し時にunescapeして\nに戻して出力している。
          var $a_load = $('<a/>').attr('class', 'unbind_beforeunload').attr('href', '#').attr('onClick', '$("#board_entry_title").val("' + template[title].title + '"); $("#board_entry_contents").val(unescape("' + template[title].body + '")); return false;').text('読み込む');
          var $span_delete= $('<span/>').attr('class', 'delete_operation_wrapper inline delete');

          var $td_entry = $('<td/>').attr('class', 'entry');
          // タイトルはlocalstorageから取得
          var $span_entry = $('<span/>').attr('class', 'entry_title').text(template[title].title);

          $span_load.append($a_load);
          $td_buttons.append($span_delete);
          $td_buttons.append($span_load);

          $td_entry.append($span_entry);

          $tr.append($td_buttons);
          $tr.append($td_entry);
          $table.append($tr);
        });
      });

      $template_entries.append($title);
      $template_entries.append($table);
      $private_entries.append($template_entries);

    });
});
