'use strict';

console.log('\'Allo \'Allo! Content script');

$(function() {
    chrome.storage.local.get(function(items) {

      var templates = items.templates;
      console.log(templates);
      var $private_entries = $('.private_entries');

      var $template_entries = $('<div/>').attr('class', 'private_entries');
      var $title = $('<h2/>').attr('class', 'title').text('テンプレート');
      var $table = $('<table/>').attr('class', 'drafts').append('<tbody/>');

      $(templates).each(function(index, template) {

        var $tr = $('<tr/>').attr('class', 'topix_entry');

        var $td_buttons = $('<td/>').attr('class', 'buttons');
        var $span_load = $('<span/>').attr('class', 'load');

        var $a_load = $('<a/>').attr('class', 'unbind_beforeunload').attr('href', '#').attr('onClick', '$("#board_entry_title").val("' + template.title + '"); $("#board_entry_contents").val("' + template.body + '"); return false;').text('読み込む');
        var $span_delete= $('<span/>').attr('class', 'delete_operation_wrapper inline delete');
        var $a_delete= $('<a/>').attr('class', 'destroy_draft_trigger').text('削除');

        var $td_entry = $('<td/>').attr('class', 'entry');
        // タイトルはlocalstorageから取得
        var $span_entry = $('<span/>').attr('class', 'entry_title').text(template.title);

        $template_entries.append($title);

        $span_delete.append($a_delete);
        $span_load.append($a_load);
        $td_buttons.append($span_delete);
        $td_buttons.append($span_load);

        $td_entry.append($span_entry);

        $tr.append($td_buttons);
        $tr.append($td_entry);
        $table.append($tr);
      })

      $template_entries.append($table);
      $private_entries.append($template_entries);

    });
});
