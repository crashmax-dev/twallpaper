precision highp float;

uniform vec2 resolution;

uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;

uniform vec2 color1Pos;
uniform vec2 color2Pos;
uniform vec2 color3Pos;
uniform vec2 color4Pos;

void main() {
  vec2 position = gl_FragCoord.xy / resolution.xy;
  position.y = 1.0 - position.y;

  float dp1 = distance(position, color1Pos);
  float dp2 = distance(position, color2Pos);
  float dp3 = distance(position, color3Pos);
  float dp4 = distance(position, color4Pos);
  float minD = min(dp1, min(dp2, min(dp3, dp4)));
  float p = 3.0;

  dp1 = pow(1.0 - (dp1 - minD), p);
  dp2 = pow(1.0 - (dp2 - minD), p);
  dp3 = pow(1.0 - (dp3 - minD), p);
  dp4 = pow(1.0 - (dp4 - minD), p);
  float dpt = abs(dp1 + dp2 + dp3 + dp4);

  gl_FragColor =
    (vec4(color1 / 255.0, 1.0) * dp1 / dpt) +
    (vec4(color2 / 255.0, 1.0) * dp2 / dpt) +
    (vec4(color3 / 255.0, 1.0) * dp3 / dpt) +
    (vec4(color4 / 255.0, 1.0) * dp4 / dpt);
}
