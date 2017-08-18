Wistia.plugin("control-with-dialog", function (video, options) {
  class MyButtonWithLinksControl {
    mountButton (buttonRoot) {
      buttonRoot.innerHTML = 'links';
      this.dialog.open();
    }

    mountDialog (dialogRoot) {
      dialogRoot.innerHTML = `
        <ul>
          <li><a href="https://wistia.com" target="_blank">Wistia!</a></li>
          <li><a href="https://trello.com" target="_blank">Trello!</a></li>
          <li><a href="https://mailchimp.com" target="_blank">MailChimp!</a></li>
        </ul>
      `;
    }
  }

  MyButtonWithLinksControl.handle = 'myButtonWithLinks';
  MyButtonWithLinksControl.type = 'lower-right-control-bar';
  MyButtonWithLinksControl.sortValue = 500;

  Wistia.defineControl(MyButtonWithLinksControl);
});
