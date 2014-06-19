'use strict';

$(function() {
    var storage = chrome.storage.local;
    storage.get(function(items) {

      if(Object.keys(items).length > 0) {
        var $privateEntries = $('.private_entries');
        if($privateEntries.length === 0) {
          $privateEntries = $('.buttons');
        }
        var $templateEntries = $('<div/>').attr('class', 'private_entries');
        var $title = $('<h2/>').attr('class', 'title').text('テンプレート');
        var $table = $('<table/>').attr('class', 'drafts').append('<tbody/>');

        $(Object.keys(items)).each(function(index, title) {
          storage.get(title, function(template) {
            var $tr = $('<tr/>').attr('class', 'topix_entry');

            var $tdButtons = $('<td/>').attr('class', 'buttons');
            var $spanLoad = $('<span/>').attr('class', 'load');

            // Chrome Extentionのcontent_scriptでは自分で定義した関数を呼び出せないので、無理矢理書き込んでいる
            // template.bodyは改行コードが含まれるため、escapeしてデータを保存している。その為、.val()呼出し時にunescapeして\nに戻して出力している。
            var $aLoad = $('<a/>').attr('class', 'unbind_beforeunload').attr('href', '#').attr('onClick', '$("#board_entry_title").val("' + template[title].title + '"); $("#board_entry_contents").val(unescape("' + template[title].body + '")); return false;').text('読み込む');
            var $spanDelete= $('<span/>').attr('class', 'delete_operation_wrapper inline delete');

            var $tdEntry = $('<td/>').attr('class', 'entry');
            // タイトルはlocalstorageから取得
            var $spanEntry = $('<span/>').attr('class', 'entry_title').text(template[title].title);

            $spanLoad.append($aLoad);
            $tdButtons.append($spanDelete);
            $tdButtons.append($spanLoad);

            $tdEntry.append($spanEntry);

            $tr.append($tdButtons);
            $tr.append($tdEntry);
            $table.append($tr);
          });
        });
        $templateEntries.append($title);
        $templateEntries.append($table);
        $privateEntries.append($templateEntries);
      }
    });
});
