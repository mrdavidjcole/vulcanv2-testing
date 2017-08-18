Wistia.plugin("back-ten-seconds", function (video, options) {
  class BackTenSecondsControl {
    constructor (video) {
      this.video = video;
      this.unbinds = [];

      this.unbinds.push(
        video.on('secondchange', () => this.updateButtonText())
      );
    }

    mountButton (buttonRoot) {
      this.buttonRoot = buttonRoot;
      this.updateButtonText();
    }

    onClickButton (event) {
      this.video.time(this.video.time() - 10);
    }

    destroy () {
      this.unbinds.map(unbind => unbind());
      this.unbinds = [];
    }

    updateButtonText () {
      this.buttonRoot.innerHTML = this.buttonText();
    }

    buttonText () {
      return `back to ${Math.max(0, Math.round(this.video.time() - 10))}`;
    }
  }

  BackTenSecondsControl.shouldMount = (video) => {
    return video._opts.backTenSecondsControl === true;
  };

  BackTenSecondsControl.handle = 'backTenSeconds';
  BackTenSecondsControl.type = 'lower-left-control-bar';
  BackTenSecondsControl.sortValue = 50;
  BackTenSecondsControl.isVideoChrome = true;

  Wistia.defineControl(BackTenSecondsControl);
  video._opts.backTenSecondsControl = true;
});
