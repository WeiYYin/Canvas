let str = '';
for(let i=0;i<20;i++){
    let a = '<div class="section"><canvas class="con"></canvas></div>';
    str += a;
}
$('#dowebok').html(str);
const conlist = document.querySelectorAll('.con');
let canvaslist = [];
for (const item of conlist) {
    let c = item.getContext('2d');
    let wW = window.innerWidth,
    wH = window.innerHeight;
    item.width = wW;
    item.height = wH;
    canvaslist.push(c);
}
let canid = null;
// canvas 绘制图形
function draw(index){
    window.cancelAnimationFrame(canid);
    canid = null;
    eval('draw'+index+'()');
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


// 图形1 绘制  littleStar 
function draw1(){
    window.document.title = "LittleStar";
    // canvas 模版
    let ctx = canvaslist[0],wW = window.innerWidth,
    wH = window.innerHeight;
    // 获取 canvas 中心点
    let wwCenter = wW/2,whCenter = wH/2;
    let wlong =  whCenter > wwCenter ? whCenter : wwCenter;
    // 获取 随机数 区间
    let random = function(a,b){
        return a + Math.random() * (b - a);
    }
    // 定义星星 方法 
    // 定义原型方法 
    let littleStar = function(){};
    littleStar.prototype = {
        // 初始化 星星数据
        init: function(){
            this.opi = random(0.6,0.9); // 星星 明暗程度 透明度
            this.deg = random(0,360) * Math.PI / 180; // 旋转角度
            this.speed = 0.1 * Math.PI / 180; // 旋转速度 同意速度
            this.opispeed = 0.01 * (random(-4, 4) | 0); // 星星 明暗闪烁
            this.r = random(5,25); // 星星 大小
            this.y = random(4, wlong); //星星 位置
            this.isRun = random(0, 10) > 3 ? true : false; // 随机判断 星星是否运动
            return this;
        },
        draw:function(){
            ctx.save(); // 锁画布
            ctx.beginPath(); // 开始一条路径
            ctx.translate(wwCenter, whCenter); // 映射画布中心点
            ctx.rotate(this.deg); // 画布旋转  旋转画布 星星位置改变 最初在一条线上 通过旋转画布改变位置
            // 绘制一个矩形。并用放射状/圆形渐变进行填充
            let gradient = ctx.createRadialGradient(0, this.y, this.r / 4, 0, this.y, this.r);
            // 添加渐变颜色
            gradient.addColorStop(0, "rgba(134,134,134," + this.opi + ")");
            gradient.addColorStop(0.1, "rgba(29, 72, 140,.25)");
            gradient.addColorStop(1, "rgba(29, 72, 140,0.01)");
            ctx.fillStyle = gradient;
            delete gradient;
            // 创建星星
            ctx.arc(0, this.y, this.r, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore(); // 画布恢复 之前的状态 (部分状态不会保留 详情 )
        },
        run:function(){
            // 星星运动
            this.deg = (this.deg + this.speed) % (Math.PI * 2);
            this.opi -= this.opispeed;
            if (this.opi < 0.3 || this.opi > 0.9) {
                this.opispeed = -this.opispeed;
            }
        }
    }

    let stars = [];
    // 添加星星
    for (var i = 0; i < 400; i++) {
        let a = new littleStar().init();
        stars.push(a);
    }

    let begin = function(){
        ctx.clearRect(0,0,wW,wH);
        stars.forEach(el=>{
            if(el.isRun){
                el.run();
            }
            el.draw();
        })
        canid = window.requestAnimationFrame(arguments.callee);
    }
    window.requestAnimationFrame(begin);    
}

// 图形2 绘制 粒子文字   绘制 元素点获取 不够
function draw2(){
    let ctx = canvaslist[1]; // 画布
    let wW = window.innerWidth,
    wH = window.innerHeight,
    lock = true,
    pause = false,
    initz = 250,
    thisTIme = null,
    animTime = null,
    grains = []; // 文字粒子点 

    let timea = 0;

    // let ideography = "君不见黄河之水天上来。奔流到海不复回。君不见高堂明镜悲白发。朝如青丝暮成雪。人生得意须尽欢。莫使金樽空对月。天生我材必有用。千金散尽还复来。烹羊宰牛且为乐。会须一饮三百杯。岑夫子。丹丘生。将进酒。杯莫停。与君歌一曲。请君为我侧耳听。钟鼓馔玉不足贵。但愿长醉不复醒。古来圣贤皆寂寞。惟有饮者留其名。陈王昔时宴平乐。斗酒十千恣欢谑。主人何为言少钱。径须沽取对君酌。五花马。千金裘。呼儿将出换美酒。与尔同销万古愁。";
    // ideography = ideography.split('。');
    let ideography = "春花灿烂凤鸾和鸣欢。雕梁画栋娇燕双栖悦。并蒂花盛开恩爱路。比翼鸟双飞温柔场。美满姻缘天注定。快乐生活永绽放。愿只愿鹣鲽情深一生幸福。缱绻深情一世温馨。"
    ideography = ideography.split('。');

    let drawText = function(text){
        text = text;
        ctx.save();
        ctx.font = "100px 微软雅黑 bold";
        ctx.fillStyle = "rgba(168,168,168,1)";
        ctx.textAlign = "center"
        ctx.textBaseLine = "middle";
        ctx.fillText(text, wW / 2, wH / 2);
        ctx.restore();
        addparticle();
    }

    

    let Grain = function(x, y, z, r) {
        this.x = Math.random() * wW; //圆点显示 随机  x轴坐标
        this.y = Math.random() * wH //圆点显示 随机 y轴坐标
        this.z = Math.random() * initz * 2 - initz; //z轴坐标
        this.ix = Math.random() * wW; //初始化x轴坐标
        this.iy = Math.random() * wH //初始化y轴坐标
        this.iz = Math.random() * initz * 2 - initz; //初始化z轴坐标
        this.tx = x; //文字元素点 目标x轴坐标
        this.ty = y; //文字元素点 目标y轴坐标
        this.tz = 0;
        this.r = r; //粒子半径
    }
    Grain.prototype = {
        draw: function () {
            ctx.save();
            ctx.beginPath();
            let scale = initz / (initz + this.z); // 透明度
            ctx.fillStyle = "rgba(100,100,100," + scale + ")"; // 填充颜色  
            ctx.arc(wW/ 2 + (this.x - wW/ 2) * scale, wH / 2 + (this.y - wH / 2) * scale, this.r * scale, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
    // 文字粒子动画
    let animate = function() {
        thisTIme = new Date();
        // 清除画布
        ctx.clearRect(0, 0, wW, wH);
        grains.forEach(function (item) {
            if (lock) {
                // 圆点组成 粒子文字 
                if (Math.abs(item.tx - item.x) < 0.1 && Math.abs(item.ty - item.y) < 0.1 && Math.abs(
                        item.tz - item.z) < 0.1) {
                    item.x = item.tx;
                    item.y = item.ty;
                    item.z = item.tz;
                    if (thisTIme - animTime > 100) lock = false;
                } else {
                    item.x += (item.tx - item.x) * 0.1;
                    item.y += (item.ty - item.y) * 0.1;
                    item.z += (item.tz - item.z) * 0.1;
                    animTime = new Date();
                }
            } else {
                // 粒子文字 分散显示 圆点
                if (Math.abs(item.ix - item.x) < 0.1 && Math.abs(item.iy - item.y) < 0.1 && Math.abs(
                        item.iz - item.z) < 0.1) {
                    item.x = item.ix;
                    item.y = item.iy;
                    item.z = item.iz;
                    pause = true;

                } else {
                    item.x += (item.ix - item.x) * 0.1;
                    item.y += (item.iy - item.y) * 0.1;
                    item.z += (item.iz - item.z) * 0.1;
                    pause = false;
                }
            }
            item.draw();
        })

        if (!pause) {
            canid = window.requestAnimationFrame(arguments.callee);
        }else{
            ctx.clearRect(0, 0, wW, wH);  
            grains = [];
            lock = true;
            pause = false;
            if(timea<(ideography.length-1)){
                timea++;
                initAnimate();
            }else{
                timea = 0;
            }
            
        }
    }
    let addparticle = function (){
        // getImageData 获取 画布像素点 rgba  数据  透明度 0-255 代替  高宽循环每一个 像素点 获取  r 大于 128 的元素点 位置
        let imgDate = ctx.getImageData(0, 0, wW, wH);    
        //  清除画布    
        ctx.clearRect(0, 0, wW, wH);        
        for (let i = 0; i < imgDate.width; i += 2) {
            for (let j = 0; j < imgDate.height; j += 2) {
                let index = (j * imgDate.width + i) * 4;
                if (imgDate.data[index] > 128) {
                    // i x轴坐标 j y轴坐标 0 z轴坐标 3 粒子半径
                    let grain = new Grain(i, j, 0, 1);
                    // 添加元素点
                    grains.push(grain);
                }
            }
        }       
        animate();
    }
    let initAnimate = function() {
        grains = [];  
        // let ind = Math.floor(Math.random()*ideography.length);
        let str = ideography[timea];
        drawText(str);
    }
    initAnimate();
}

// 图形3 绘制
function draw3(){
    var w  = window.innerWidth,
        h  = window.innerHeight,
        ctx = canvaslist[2],// 画布 3 
        opts = {
            len: 20,
            count: 200,
            baseTime: 10,
            addedTime: 50,
            dieChance: .05,
            spawnChance: 1,
            sparkChance: .1,
            sparkDist: 10,
            sparkSize: 2,
            color: 'hsl(hue,100%,light%)',
            baseLight: 50,
            addedLight: 10,
            shadowToTimePropMult: 6, //影子时间
            baseLightInputMultiplier: .01, //基线乘子
            addedLightInputMultiplier: .02, // 光输入乘法器
            cx: w / 2,
            cy: h / 2,
            repaintAlpha: .04, // 画布透明度
            hueChange: .1
        },
        tick = 0,
        // 点集合 
        lines = [], 
        // 销毁区域
        dieX = w / 2 / opts.len, 
        dieY = h / 2 / opts.len,
        baseRad = Math.PI * 2 / 10; // 默认 角度
        ctx.clearRect(0,0,w,h);
    let line = function(){
        this.reset();
    };
    let animate = function(){
        // 画布重叠显示 透明度修改 
        canid = window.requestAnimationFrame(arguments.callee);
        ++tick;
        ctx.globalCompositeOperation = 'source-over';  // 将新绘制 图像 设置到 原图像 之上
        ctx.shadowBlur = 0; // 设置 阴影 模糊级数
        ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha); // 填充透明度 修改
        ctx.fillRect(0, 0, w, h); // 矩形 创建
        ctx.globalCompositeOperation = 'lighter'; // 新绘制图像 与 原图像 重合
        // 线条 添加
        if (lines.length < opts.count && Math.random() < opts.spawnChance) lines.push(new line);
        // 线条 动画
        lines.map(function (line) {
            line.step()
        })
    }
    
    line.prototype = {
        reset:function(){
            this.x = 0;
            this.y = 0;
            this.addedX = 0;
            this.addedY = 0;
            this.rad = 0;
            this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
            this.color = opts.color.replace('hue', tick * opts.hueChange); // 颜色 设置
            this.cumulativeTime = 0; // 积累时间
            this.beginPhase()
        },
        beginPhase:function(){
            this.x += this.addedX;
            this.y += this.addedY;
            this.time = 0;
            this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
            this.rad += baseRad * (Math.random() < .5 ? 1 : -1); // 路径 方向 控制
            this.addedX = Math.cos(this.rad); // 角度  x轴 方向 移动距离
            this.addedY = Math.sin(this.rad); // 角度 Y轴 方向 移动距离
            // 线条重置 判断  Math.random() < opts.dieChance 随机重置  this.x > dieX || this.x < -dieX || this.y > dieY || this.y < - dieY 线条超出范围重置
            if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -
                dieY) this.reset()
        },
        step:function(){
            ++this.time;
            ++this.cumulativeTime;
            // 运行 多少次  重新设置 方向
            if (this.time >= this.targetTime) this.beginPhase();
            // 设置  重绘坐标  
            var prop = this.time / this.targetTime,
                wave = Math.sin(prop * Math.PI / 2),
                x = this.addedX * wave,
                y = this.addedY * wave;
            ctx.shadowBlur = prop * opts.shadowToTimePropMult;
            ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(
                this.cumulativeTime * this.lightInputMultiplier));
            ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);
            // 随机出现 火花点
            if (Math.random() < opts.sparkChance){
                ctx.fillRect(
                    opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2,
                    opts.sparkSize, 
                    opts.sparkSize
                )
            }
        },
    }
    
    animate();
    
}

// 图形4 绘制
function draw4(){

    
}

// 图形5 绘制
function draw5(){

    
}

// 图形6 绘制
function draw6(){

}