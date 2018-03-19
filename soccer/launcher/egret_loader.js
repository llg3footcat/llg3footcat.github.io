/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

egret_h5.startGame = function () {
    var  context = egret.MainContext.instance;
    context.touchContext = new egret.HTML5TouchContext();
    context.deviceContext = new egret.HTML5DeviceContext(50);
    context.netContext = new egret.HTML5NetContext();

    egret.StageDelegate.getInstance().setDesignSize(640, 1100);
    context.stage = new egret.Stage();
    var scaleMode =  egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? egret.StageScaleMode.NO_BORDER : egret.StageScaleMode.NO_BORDER;
    context.stage.scaleMode = scaleMode;

    //WebGL是egret的Beta特性，默认关闭
    var rendererType = 0;
    if (rendererType == 1) {// egret.WebGLUtils.checkCanUseWebGL()) {
        context.rendererContext = new egret.WebGLRenderer();
    }
    else {
        context.rendererContext = new egret.HTML5CanvasRenderer();
    }

    egret.MainContext.instance.rendererContext.texture_scale_factor = 1;
    context.run();

    var rootClass;
    if(document_class){
        rootClass = egret.getDefinitionByName(document_class);
    }
    if(rootClass) {
        var rootContainer = new rootClass();
        if(rootContainer instanceof egret.DisplayObjectContainer){
            context.stage.addChild(rootContainer);
        }
        else{
            throw new Error("文档类必须是egret.DisplayObjectContainer的子类!");
        }
    }
    else{
        throw new Error("找不到文档类！");
    }

//    window.addEventListener("resize",egret_h5.resize);

//    setTimeout(egret_h5.resize,50);
};

egret_h5.resize = function(){

//return;

    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;





    if (w > h){

        var scale = 640 / 1100;
        if (h / w < scale){
            var viewportH = h;
            var viewportW = h / scale;
            var canvas = document.getElementById("gameDiv");
            canvas.style.webkitTransform = ""
        }
        else{
            var viewportW = w;
            var viewportH = w * scale;
            var canvas = document.getElementById("gameDiv");
            var offset = (h - viewportH) / 2;
            canvas.style.webkitTransform = "translate(0px," + offset + "px)"
        }
        var container = new egret.EqualToFrame();
        var content = egret.Browser.getInstance().isMobile ? new egret.FixedSize(viewportW,viewportH) : new egret.FixedSize(640, 1100);
        var policy = new egret.ResolutionPolicy(container, content);
        egret.StageDelegate.getInstance().setDesignSize(1100, 640, policy);
    }
    else{

        var scale = 1100 / 640;
        if (h / w < scale){
            var viewportH = h;
            var viewportW = h / scale;
            var canvas = document.getElementById("gameDiv");
            canvas.style.webkitTransform = ""
        }
        else{
            var viewportW = w;
            var viewportH = w * scale;
            var canvas = document.getElementById("gameDiv");
            var offset = (h - viewportH) / 2;
            canvas.style.webkitTransform = "translate(0px," + offset + "px)"
        }
        var container = new egret.EqualToFrame();
        var content = egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? new egret.FixedSize(viewportW,viewportH) : new egret.FixedSize(640, 1100);
        var policy = new egret.ResolutionPolicy(container, content);
        egret.StageDelegate.getInstance().setDesignSize(640, 1100, policy);
    }
}