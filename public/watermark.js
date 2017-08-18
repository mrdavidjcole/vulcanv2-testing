Wistia.plugin("watermark", function (video, options) {
  class BottomLeftWaterMarkControl {
    mount (rootElem) {
      this.watermark = document.createElement('img');
      this.watermark.src = options.imageUrl;
      this.watermark.style.opacity = options.opacity || 0.5;
      this.watermark.style.transition = 'opacity 400ms, transform 400ms';
      this.watermark.style.transform = `scale(${this.props.scale})`;
      this.watermark.style.position = 'absolute';
      this.watermark.style.left = `${10 * this.props.scale}px`;
      this.watermark.style.bottom = `${10 * this.props.scale}px`;
      rootElem.appendChild(this.watermark);
      const imgLoadPromise = new Promise((resolve) => {
        this.watermark.onload = resolve;
        this.watermark.onerror = resolve;
      });
      const oneSecondPromise = new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      return Promise.race([imgLoadPromise, oneSecondPromise]);
    }

    onControlPropsUpdated (prevProps) {
      if (this.props.scale !== prevProps.scale) {
        this.watermark.style.transform = `scale(${this.props.scale})`;
      }

      if (this.props.areControlsVisible !== prevProps.areControlsVisible) {
        this.watermark.style.opacity = this.opacityBasedOnControlVisibility();
      }
    }

    opacityBasedOnControlVisibility () {
      if (this.props.areControlsVisible) {
        return options.opacity || 0.5;
      } else {
        return 0.2;
      }
    }
  }

  BottomLeftWaterMarkControl.handle = 'bottomLeftWaterMark';
  BottomLeftWaterMarkControl.type = 'middle-column';

  Wistia.defineControl(BottomLeftWaterMarkControl);
});
