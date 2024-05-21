createDialog().then((config) => {
  return ClassicEditor.create(document.querySelector('.editor'), {
    ckbox: {
      tokenUrl: config.ckboxTokenUrl,
    },
  })
    .then((editor) => {
      window.editor = editor;
    })
    .catch(handleSampleError);
});

function handleSampleError(error) {
  const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

  const message = [
    'Oops, something went wrong!',
    `Please, report the following error on ${issueUrl} with the build id "8bcfycnnxfgl-7icmfxgays7" and the error stack trace:`,
  ].join('\n');

  console.error(message);
  console.error(error);
}
// CKEditor 초기화
CKEDITOR.replace('editor1', {
  contentsCss: 'css/styles.css', // CKEditor 내부에서 사용할 CSS 파일을 지정
});

// 추가적인 반응형 처리를 위한 예제
document.addEventListener('DOMContentLoaded', function () {
  var tables = document.querySelectorAll('table');
  tables.forEach(function (table) {
    table.style.width = '100%';
    table.style.overflowX = 'auto';
  });
});
