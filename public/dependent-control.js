Wistia.plugin("dependent-control", function(video, options) {
  class MyButton {
    constructor (video) {
      this.video = video;
    }

    mountButton (buttonRoot) {
      buttonRoot.innerHTML = 'toggle';
    }

    onClickButton (event) {
      this.video.controls.myOverlay.toggle();
    }
  }

  MyButton.type = 'lower-right-control-bar';
  MyButton.handle = 'myButton';
  Wistia.defineControl(MyButton);

  class MyOverlay {
    constructor (video) {
      this.video = video;
      this._isOpen = false;
    }

    mount (rootElem) {
      const overlay = document.createElement('div');
      overlay.innerHTML = 'hi I am an overlay';
      overlay.style.display = 'block';
      overlay.style.position = 'absolute';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(255, 0, 0, 0.5)';
      overlay.style.color = '#fff';
      rootElem.appendChild(overlay);

      if (video._opts.asyncOverlay) {
        return new Promise((resolve) => {
          setTimeout(2000, () => {
            this.overlay = overlay;
          });
        });
      } else {
        this.overlay = overlay;
      }
    }

    isOpen () {
      return this._isOpen;
    }

    open () {
      this._isOpen = true;
      this.overlay.style.display = 'block';
    }

    close () {
      this._isOpen = false;
      this.overlay.style.display = 'none';
    }

    toggle () {
      this.mounted.then(() => {
        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      });
    }
  }

  MyOverlay.type = 'behind-controls';
  MyOverlay.handle = 'myOverlay';
  Wistia.defineControl(MyOverlay);
});