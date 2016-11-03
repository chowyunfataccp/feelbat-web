jQuery(function() {
    var $ = jQuery,
        $wrapLogo = $('#uploaderLogo'),
        // 图片容器
        $queueLogo = $('<ul class="filelist"></ul>').appendTo($wrapLogo.find('.queueList') ),
        // 状态栏，包括进度和控制按钮
        $statusBarLogo = $wrapLogo.find('.statusBar'),
        // 文件总体选择信息。
        $infoLogo = $statusBarLogo.find('.info'),
        // 上传按钮
        $uploadLogo = $wrapLogo.find('.uploadBtn'),
        // 没选择文件之前的内容。
        $placeHolderLogo = $wrapLogo.find('.placeholder'),
        // 总体进度条
        $progressLogo = $statusBarLogo.find('.progress').hide(),
        // 添加的文件数量
        fileCountLogo = 0,
        // 添加的文件总大小
        fileSizeLogo = 0,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 110 * ratio,

        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding',

        // 所有文件的进度信息，key为file id
        percentagesLogo = {},

        supportTransition = (function(){
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                      'WebkitTransition' in s ||
                      'MozTransition' in s ||
                      'msTransition' in s ||
                      'OTransition' in s;
            s = null;
            return r;
        })(),
        
        // WebUploader实例
        uploaderLogo;

    if ( !WebUploader.Uploader.support() ) {
        alert( 'Web Uploader 不支持您的浏览器！');
        throw new Error( 'WebUploader does not support the browser you are using.' );
    }

    // 实例化
    uploaderLogo = WebUploader.create({
        pick: {
            id: '#filePicker1Logo',
            label: '添加Logo',
            multiple:false
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        disableGlobalDnd: true,
        chunked: true,
        server: 'upload/upload/',
        fileNumLimit: 1,
        fileSizeLimit: 100 * 1024 * 1024,    // 100 M
        fileSingleSizeLimit: 10 * 1024 * 1024    // 10 M
    });

    // 添加“添加文件”的按钮，
    uploaderLogo.addButton({
        id: '#filePicker2Logo',
        label: '继续添加'
    });

    // 当有文件添加进来时执行，负责view的创建
    function addFileLogo( file ) {
        var $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '</li>' ),

            $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span>' +
                '<span class="rotateRight">向右旋转</span>' +
                '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
            $prgress = $li.find('p.progress span'),
            $wrap = $li.find( 'p.imgWrap' ),
            $info = $('<p class="error"></p>'),

            showError = function( code ) {
                switch( code ) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;

                    case 'interrupt':
                        text = '上传暂停';
                        break;

                    default:
                        text = '上传失败，请重试';
                        break;
                }

                $info.text( text ).appendTo( $li );
            };

        if ( file.getStatus() === 'invalid' ) {
            showError( file.statusText );
        } else {
            // @todo lazyload
            $wrap.text( '预览中' );
            uploaderLogo.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }

                var img = $('<img src="'+src+'">');
                $wrap.empty().append( img );
            }, thumbnailWidth, thumbnailHeight );

            percentagesLogo[ file.id ] = [ file.size, 0 ];
            file.rotation = 0;
        }

        file.on('statuschange', function( cur, prev ) {
            if ( prev === 'progress' ) {
                $prgress.hide().width(0);
            } else if ( prev === 'queued' ) {
                $li.off( 'mouseenter mouseleave' );
                $btns.remove();
            }

            // 成功
            if ( cur === 'error' || cur === 'invalid' ) {
                console.log( file.statusText );
                showError( file.statusText );
                percentagesLogo[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( 'interrupt' );
            } else if ( cur === 'queued' ) {
                percentagesLogo[ file.id ][ 1 ] = 0;
            } else if ( cur === 'progress' ) {
                $info.remove();
                $prgress.css('display', 'block');
            } else if ( cur === 'complete' ) {
                $li.append( '<span class="success"></span>' );
            }

            $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
        });

        $li.on( 'mouseenter', function() {
            $btns.stop().animate({height: 30});
        });

        $li.on( 'mouseleave', function() {
            $btns.stop().animate({height: 0});
        });

        $btns.on( 'click', 'span', function() {
            var index = $(this).index(),
                deg;

            switch ( index ) {
                case 0:
                    uploaderLogo.removeFile( file );
                    return;

                case 1:
                    file.rotation += 90;
                    break;

                case 2:
                    file.rotation -= 90;
                    break;
            }

            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                // use jquery animate to rotation
                // $({
                //     rotation: rotation
                // }).animate({
                //     rotation: file.rotation
                // }, {
                //     easing: 'linear',
                //     step: function( now ) {
                //         now = now * Math.PI / 180;

                //         var cos = Math.cos( now ),
                //             sin = Math.sin( now );

                //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                //     }
                // });
            }


        });

        $li.appendTo( $queueLogo );
    }

    // 负责view的销毁
    function removeFile( file ) {
        var $li = $('#'+file.id);

        delete percentagesLogo[ file.id ];
        updateTotalProgress();
        $li.off().find('.file-panel').off().end().remove();
    }

    function updateTotalProgress() {
        var loaded = 0,
            total = 0,
            spans = $progressLogo.children(),
            percent;

        $.each( percentagesLogo, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;

        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatus();
    }

    function updateStatus() {
        var text = '', stats;

        if ( state === 'ready' ) {
            text = '选中' + fileCountLogo + '张图片，共' + WebUploader.formatSize( fileSizeLogo ) + '。';
        } else if ( state === 'confirm' ) {
            stats = uploaderLogo.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张，'+
                    stats.uploadFailNum + '张上传失败'
            }

        } else {
            stats = uploaderLogo.getStats();
            text = '共' + fileCountLogo + '张（' +
                    WebUploader.formatSize( fileSizeLogo )  +
                    '），已上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }

        $infoLogo.html( text );
    }

    function setState( val ) {
        var file, stats;

        if ( val === state ) {
            return;
        }

        $uploadLogo.removeClass( 'state-' + state );
        $uploadLogo.addClass( 'state-' + val );
        state = val;

        switch ( state ) {
            case 'pedding':
                $placeHolderLogo.removeClass( 'element-invisible' );
                $queueLogo.parent().removeClass('filled');
                $queueLogo.hide();
                $statusBarLogo.addClass( 'element-invisible' );
                uploaderLogo.refresh();
                break;

            case 'ready':
            	$placeHolderLogo.addClass( 'element-invisible' );
                $( '#filePicker2Logo' ).removeClass( 'element-invisible');
                $queueLogo.parent().addClass('filled');
                $queueLogo.show();
                $statusBarLogo.removeClass('element-invisible');
                uploaderLogo.refresh();
                break;

            case 'uploading':
                $( '#filePicker2Logo' ).addClass( 'element-invisible' );
                $progressLogo.show();
                $uploadLogo.text( '暂停上传' );
                break;

            case 'paused':
                $progressLogo.show();
                $uploadLogo.text( '继续上传' );
                break;

            case 'confirm':
                $progressLogo.hide();
                $uploadLogo.text( '开始上传' ).addClass( 'disabled' );

                stats = uploaderLogo.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setState( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploaderLogo.getStats();
                if ( stats.successNum ) {
                    alert( '上传成功' );
                } else {
                    // 没有成功的图片，重设
                    state = 'done';
                    location.reload();
                }
                break;
        }

        updateStatus();
    }

    uploaderLogo.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentagesLogo[ file.id ][ 1 ] = percentage;
        updateTotalProgress();
    };

    uploaderLogo.onFileQueued = function( file ) {
        fileCountLogo++;
        fileSizeLogo += file.size;

        if ( fileCountLogo === 1 ) {
            $placeHolderLogo.addClass( 'element-invisible' );
            $statusBarLogo.show();
        }

        addFileLogo( file );
        setState( 'ready' );
        updateTotalProgress();
    };

    uploaderLogo.onFileDequeued = function( file ) {
        fileCountLogo--;
        fileSizeLogo -= file.size;

        if ( !fileCountLogo ) {
            setState( 'pedding' );
        }

        removeFile( file );
        updateTotalProgress();

    };

    uploaderLogo.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setState( 'confirm' );
                break;

            case 'startUpload':
                setState( 'uploading' );
                break;

            case 'stopUpload':
                setState( 'paused' );
                break;

        }
    });

    uploaderLogo.onError = function( code ) {
        alert( 'Error: ' + code );
    };

    $uploadLogo.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }

        if ( state === 'ready' ) {
            uploaderLogo.upload();
        } else if ( state === 'paused' ) {
            uploaderLogo.upload();
        } else if ( state === 'uploading' ) {
            uploaderLogo.stop();
        }
    });

    $infoLogo.on( 'click', '.retry', function() {
        uploaderLogo.retry();
    } );

    $uploadLogo.addClass( 'state-' + state );
    updateTotalProgress();
});