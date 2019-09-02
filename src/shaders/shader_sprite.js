/**
 * @type {ShaderSource}
 */
export const spriteShader = {

vertex:

`attribute vec2 aSpritePosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
uniform mat3 uMatrix;
varying vec2 vTextureCoord;
varying vec4 vColor;

void main() {
gl_Position = vec4((uMatrix * vec3(aSpritePosition, 1)).xy, 0, 1);
vTextureCoord = aTextureCoord;
vColor = aColor;
}`,

fragment:

`precision mediump float;
uniform sampler2D uSpriteTexture;
varying vec2 vTextureCoord;
varying vec4 vColor;

void main() {
float i = texture2D(uSpriteTexture, vTextureCoord).r;
if (vTextureCoord.x < .0) {i = 1.0;}
if (i>.0) {
gl_FragColor = vColor;
}
}`

}
