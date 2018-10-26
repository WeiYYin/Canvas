function main(){
    let canvas = document.getElementById('canvas');

    let gl = getWebGLContext(canvas,true);

    if(!!!gl){
        console.log('error');
        return;
    }

    gl.clearColor(1.0, 0.0, 1.0, 1.0); // 设置背景色

    gl.clear(gl.COLOR_BUFFER_BIT); // 清除画布 用设置背景色 填充

}

