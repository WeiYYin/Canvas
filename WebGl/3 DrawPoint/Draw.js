// 顶点着色 程序
var VSHADER_SOURCE = 
    'void main() {\n' + 
    // 设置 坐标   X Y X 齐次坐标   （X,Y,Z,W） 等于 （X/W,Y/W,Z/W）   坐标系 必须使用浮点数
    // WebGl  坐标系   中心点 （0.0,,0.0,0.0）   上下左右最大值为 1 （-1.0,0.0,0.0）（1.0,0.0,0.0） (0.0,1.0,0.0) (0.0,-1.0,0.0)
    'gl_Position = vec4(0.0,0.0,0.0,1.0);\n' + 
    'gl_PointSize = 10.0;\n' + // 设置 尺寸
    '}\n';
// 片元着色器 程序
var FSHADER_SOURCE = 
    'void main() {\n' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +  // 设置颜色
    '}\n';

function main(){    

    let canvas = document.getElementById('canvas');
    let gl = getWebGLContext(canvas);
    if(!!!gl){
        console.log('error');
        return;
    }
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('着色器 加载失败!');
        return;
    }
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,1);
}
