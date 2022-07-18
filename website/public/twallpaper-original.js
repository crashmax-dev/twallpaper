var TWallpaper = (function() {
  var _width = 50;
  var _height = 50;
  var _phase = 0;
  var _tail = 0;
  var _tails = 90;
  var _scrolltails = 50;
  var _ts = 0;
  var _fps = 15;
  var _frametime = 1000 / _fps;
  var _frames = [];
  var _interval = null;
  var _raf = null;
  var _colors = [];
  var _curve = [
    0 , 0.25 , 0.50 , 0.75 , 1 , 1.5 , 2 , 2.5 , 3 , 3.5 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 ,
    13 , 14 , 15 , 16 , 17 , 18 , 18.3 , 18.6 , 18.9 , 19.2 , 19.5 , 19.8 , 20.1 , 20.4 , 20.7 ,
    21.0 , 21.3 , 21.6 , 21.9 , 22.2 , 22.5 , 22.8 , 23.1 , 23.4 , 23.7 , 24.0 , 24.3 , 24.6 ,
    24.9 , 25.2 , 25.5 , 25.8 , 26.1 , 26.3 , 26.4 , 26.5 , 26.6 , 26.7 , 26.8 , 26.9 , 27 ,
  ];
  var _positions = [
    { x: 0.80, y: 0.10 },
    { x: 0.60, y: 0.20 },
    { x: 0.35, y: 0.25 },
    { x: 0.25, y: 0.60 },
    { x: 0.20, y: 0.90 },
    { x: 0.40, y: 0.80 },
    { x: 0.65, y: 0.75 },
    { x: 0.75, y: 0.40 }
  ];
  var _phases = _positions.length;

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
  function getPositions(shift) {
    var positions = [].concat(_positions);
    while (shift > 0) {
      positions.push(positions.shift());
      shift--;
    }
    var result = [];
    for (var i = 0; i < positions.length; i += 2) {
      result.push(positions[i]);
    }
    return result;
  }
  function curPosition(phase, tail) {
    tail %= _tails;
    var pos = getPositions(phase % _phases);
    if (tail) {
      var next_pos = getPositions(++phase % _phases);
      var d1x = (next_pos[0].x - pos[0].x) / _tails;
      var d1y = (next_pos[0].y - pos[0].y) / _tails;
      var d2x = (next_pos[1].x - pos[1].x) / _tails;
      var d2y = (next_pos[1].y - pos[1].y) / _tails;
      var d3x = (next_pos[2].x - pos[2].x) / _tails;
      var d3y = (next_pos[2].y - pos[2].y) / _tails;
      var d4x = (next_pos[3].x - pos[3].x) / _tails;
      var d4y = (next_pos[3].y - pos[3].y) / _tails;
      return [
        { x: pos[0].x + d1x * tail,
          y: pos[0].y + d1y * tail },
        { x: pos[1].x + d2x * tail,
          y: pos[1].y + d2y * tail },
        { x: pos[2].x + d3x * tail,
          y: pos[2].y + d3y * tail },
        { x: pos[3].x + d4x * tail,
          y: pos[3].y + d4y * tail }
      ];
    }
    return pos;
  }
  function changeTail(diff) {
    _tail += diff;
    while (_tail >= _tails) {
      _tail -= _tails;
      _phase++;
      if (_phase >= _phases) {
        _phase -= _phases;
      }
    }
    while (_tail < 0) {
      _tail += _tails;
      _phase--;
      if (_phase < 0) {
        _phase += _phases;
      }
    }
  }
  var _scrollTicking = false;
  var _scrollDelta = 0;
  function onWheel(e) {
    _scrollDelta += e.deltaY;
    if (!_scrollTicking) {
      requestAnimationFrame(drawOnWheel);
      _scrollTicking = true;
    }
  }
  function drawOnWheel() {
    var diff = _scrollDelta / _scrolltails;
    _scrollDelta %= _scrolltails;
    diff = diff > 0 ? Math.floor(diff) : Math.ceil(diff);
    if (diff) {
      changeTail(diff);
      var cur_pos = curPosition(_phase, _tail);
      drawGradient(cur_pos);
    }
    _scrollTicking = false;
  }
  function drawNextPositionAnimated() {
    if (_frames.length > 0) {
      var id = _frames.shift();
      drawImageData(id);
    } else {
      clearInterval(_interval);
    }
  }
  function getGradientImageData(positions) {
    var id = wallpaper._hctx.createImageData(_width, _height);
    var pixels = id.data;

    var offset = 0;
    for (var y = 0; y < _height; y++) {
      var directPixelY = y / _height;
      var centerDistanceY = directPixelY - 0.5;
      var centerDistanceY2 = centerDistanceY * centerDistanceY;

      for (var x = 0; x < _width; x++) {
        var directPixelX = x / _width;

        var centerDistanceX = directPixelX - 0.5;
        var centerDistance = Math.sqrt(centerDistanceX * centerDistanceX + centerDistanceY2);

        var swirlFactor = 0.35 * centerDistance;
        var theta = swirlFactor * swirlFactor * 0.8 * 8.0;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        var pixelX = Math.max(0.0, Math.min(1.0, 0.5 + centerDistanceX * cosTheta - centerDistanceY * sinTheta));
        var pixelY = Math.max(0.0, Math.min(1.0, 0.5 + centerDistanceX * sinTheta + centerDistanceY * cosTheta));

        var distanceSum = 0.0;

        var r = 0.0;
        var g = 0.0;
        var b = 0.0;

        for (var i = 0; i < _colors.length; i++) {
          var colorX = positions[i].x;
          var colorY = positions[i].y;

          var distanceX = pixelX - colorX;
          var distanceY = pixelY - colorY;

          var distance = Math.max(0.0, 0.9 - Math.sqrt(distanceX * distanceX + distanceY * distanceY));
          distance = distance * distance * distance * distance;
          distanceSum += distance;

          r += distance * _colors[i].r / 255;
          g += distance * _colors[i].g / 255;
          b += distance * _colors[i].b / 255;
        }

        pixels[offset++] = r / distanceSum * 255.0;
        pixels[offset++] = g / distanceSum * 255.0;
        pixels[offset++] = b / distanceSum * 255.0;
        pixels[offset++] = 0xFF;
      }
    }
    return id;
  }
  function drawImageData(id) {
    wallpaper._hctx.putImageData(id, 0, 0);
    wallpaper._ctx.drawImage(wallpaper._hc, 0, 0, 50, 50);
  }
  function drawGradient(pos) {
    drawImageData(getGradientImageData(pos));
  }
  function doAnimate() {
    var now = +Date.now();
    if (!document.hasFocus() ||
        now - _ts < _frametime) {
      _raf = requestAnimationFrame(doAnimate);
      return;
    }
    _ts = now;
    changeTail(1);
    var cur_pos = curPosition(_phase, _tail);
    drawGradient(cur_pos);
    _raf = requestAnimationFrame(doAnimate);
  }

  var wallpaper = {
    init: function(el) {
      _colors = [];
      var colors = (el.getAttribute('data-colors') || '');
      if (colors) {
        colors = colors.split(',');
      }
      for (var i = 0; i < colors.length; i++) {
        _colors.push(hexToRgb(colors[i]));
      }
      if (!wallpaper._hc) {
        wallpaper._hc = document.createElement('canvas');
        wallpaper._hc.width = _width;
        wallpaper._hc.height = _height;
        wallpaper._hctx = wallpaper._hc.getContext('2d');
      }
      wallpaper._canvas = el;
      wallpaper._ctx = wallpaper._canvas.getContext('2d');
      wallpaper.update();
    },
    update: function() {
      var pos = curPosition(_phase, _tail);
      drawGradient(pos);
    },
    toNextPosition: function() {
      clearInterval(_interval);
      _frames = [];

      var prev_pos = getPositions(_phase % _phases);
      _phase++;
      var pos = getPositions(_phase % _phases);

      var h = 27;
      var d1x = (pos[0].x - prev_pos[0].x) / h;
      var d1y = (pos[0].y - prev_pos[0].y) / h;
      var d2x = (pos[1].x - prev_pos[1].x) / h;
      var d2y = (pos[1].y - prev_pos[1].y) / h;
      var d3x = (pos[2].x - prev_pos[2].x) / h;
      var d3y = (pos[2].y - prev_pos[2].y) / h;
      var d4x = (pos[3].x - prev_pos[3].x) / h;
      var d4y = (pos[3].y - prev_pos[3].y) / h;

      for (var frame = 0; frame < 60; frame++) {
        var cur_pos = [
          { x: prev_pos[0].x + d1x * _curve[frame],
            y: prev_pos[0].y + d1y * _curve[frame] },
          { x: prev_pos[1].x + d2x * _curve[frame],
            y: prev_pos[1].y + d2y * _curve[frame] },
          { x: prev_pos[2].x + d3x * _curve[frame],
            y: prev_pos[2].y + d3y * _curve[frame] },
          { x: prev_pos[3].x + d4x * _curve[frame],
            y: prev_pos[3].y + d4y * _curve[frame] }
        ];
        _frames.push(getGradientImageData(cur_pos));
      }
      _interval = setInterval(drawNextPositionAnimated, 1000 / 30);
    },
    animate: function(start) {
      if (!start) {
        cancelAnimationFrame(_raf);
        return;
      }
      doAnimate();
    },
    scrollAnimate: function(start) {
      if (start) {
        document.addEventListener('wheel', onWheel);
      } else {
        document.removeEventListener('wheel', onWheel);
      }
    }
  };
  return wallpaper;
}());
