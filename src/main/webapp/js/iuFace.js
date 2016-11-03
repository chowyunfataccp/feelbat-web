jQuery(function() {
    var $ = jQuery,
    	$wrapLogo = $('#uploaderLogo'),
        $wrapFace = $('#uploaderFace'),
        $wrapInner = $('#uploaderInner'),
        // 图片容器
        $queueLogo = $('<ul class="filelist"></ul>').appendTo($wrapLogo.find('.queueList') ),
        $queueFace = $('<ul class="filelist"></ul>').appendTo($wrapFace.find('.queueList') ),
        $queueInner = $('<ul class="filelist"></ul>').appendTo($wrapInner.find('.queueList') ),
        // 状态栏，包括进度和控制按钮
        $statusBarLogo = $wrapLogo.find('.statusBar'),
        $statusBarFace = $wrapFace.find('.statusBar'),
        $statusBarInner = $wrapInner.find('.statusBar'),
        // 文件总体选择信息。
        $infoLogo = $statusBarLogo.find('.info'),
        $infoFace = $statusBarFace.find('.info'),
        $infoInner = $statusBarInner.find('.info'),
        // 上传按钮
        $uploadLogo = $wrapLogo.find('.uploadBtn'),
        $uploadFace = $wrapFace.find('.uploadBtn'),
        $uploadInner = $wrapInner.find('.uploadBtn'),
        // 没选择文件之前的内容。
        $placeHolderLogo = $wrapLogo.find('.placeholder'),
        $placeHolderFace = $wrapFace.find('.placeholder'),
        $placeHolderInner = $wrapInner.find('.placeholder'),
        // 总体进度条
        $progressLogo = $statusBarLogo.find('.progress').hide(),
        $progressFace = $statusBarFace.find('.progress').hide(),
        $progressInner = $statusBarInner.find('.progress').hide(),
        // 添加的文件数量
        fileCountLogo = 0,
        fileCountFace = 0,
        fileCountInner = 0,
        // 添加的文件总大小
        fileSizeLogo = 0,
        fileSizeFace = 0,
        fileSizeInner = 0,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 110 * ratio,
        thumbnailHeight = 110 * ratio,

        // 可能有pedding, ready, uploading, confirm, done.
        stateLogo = 'pedding',
        stateFace = 'pedding',
        stateInner = 'pedding',

        // 所有文件的进度信息，key为file id
        percentagesLogo = {},
        percentagesFace = {},
        percentagesInner = {},

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
        uploaderLogo,
        uploaderFace,
        uploaderInner;

    if ( !WebUploader.Uploader.support() ) {
        alert( 'Web Uploader 不支持您的浏览器！');
        throw new Error( 'WebUploader does not support the browser you are using.' );
    }

    // 实例化
    uploaderLogo = WebUploader.create({
        pick: {
            id: '#filePicker1Logo',
            multiple:false,
            label: '添加Logo'
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        disableGlobalDnd: true,
        chunked: true,
        server: 'shopController.do?uploadLogo',
        fileNumLimit: 1,
        fileSizeLimit: 100 * 1024 * 1024,    // 100 M
        fileSingleSizeLimit: 10 * 1024 * 1024    // 10 M
    });
    uploaderFace = WebUploader.create({
        pick: {
            id: '#filePicker1Face',
            multiple:false,
            label: '添加门面照'
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        disableGlobalDnd: true,
        chunked: true,
        server: 'shopController.do?uploadFace',
        fileNumLimit: 1,
        fileSizeLimit: 100 * 1024 * 1024,    // 100 M
        fileSingleSizeLimit: 10 * 1024 * 1024    // 10 M
    });
    
    uploaderInner = WebUploader.create({
        pick: {
            id: '#filePicker1Inner',
            label: '添加实景图'
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        disableGlobalDnd: true,
        chunked: true,
        server: 'shopController.do?uploadInner',
        fileNumLimit: 10,
        fileSizeLimit: 100 * 1024 * 1024,    // 100 M
        fileSingleSizeLimit: 10 * 1024 * 1024    // 10 M
    });

    // 添加“添加文件”的按钮，
    uploaderLogo.addButton({
        id: '#filePicker2Logo',
        label: '继续添加'
    });
    uploaderFace.addButton({
        id: '#filePicker2Face',
        label: '继续添加'
    });
    uploaderInner.addButton({
        id: '#filePicker2Inner',
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
            }


        });

        $li.appendTo( $queueLogo );
    }
    function addFileFace( file ) {
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
            uploaderFace.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }

                var img = $('<img src="'+src+'">');
                $wrap.empty().append( img );
            }, thumbnailWidth, thumbnailHeight );

            percentagesFace[ file.id ] = [ file.size, 0 ];
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
                percentagesFace[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( 'interrupt' );
            } else if ( cur === 'queued' ) {
                percentagesFace[ file.id ][ 1 ] = 0;
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
                    uploaderFace.removeFile( file );
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
            }


        });

        $li.appendTo( $queueFace );
    }
    
    function addFileInner( file ) {
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
            uploaderInner.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }

                var img = $('<img src="'+src+'">');
                $wrap.empty().append( img );
            }, thumbnailWidth, thumbnailHeight );

            percentagesInner[ file.id ] = [ file.size, 0 ];
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
                percentagesInner[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( 'interrupt' );
            } else if ( cur === 'queued' ) {
                percentagesInner[ file.id ][ 1 ] = 0;
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
                    uploaderInner.removeFile( file );
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
            }


        });

        $li.appendTo( $queueInner );
    }

    // 负责view的销毁
    function removeFileLogo( file ) {
        var $li = $('#'+file.id);
        delete percentagesLogo[ file.id ];
        updateTotalProgressLogo();
        $li.off().find('.file-panel').off().end().remove();
    }
    function removeFileFace( file ) {
        var $li = $('#'+file.id);
        delete percentagesFace[ file.id ];
        updateTotalProgressFace();
        $li.off().find('.file-panel').off().end().remove();
    }
    function removeFileInner( file ) {
        var $li = $('#'+file.id);
        delete percentagesInner[ file.id ];
        updateTotalProgressInner();
        $li.off().find('.file-panel').off().end().remove();
    }

    function updateTotalProgressLogo() {
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
        updateStatusLogo();
    }
    
    
    function updateTotalProgressFace() {
        var loaded = 0,
            total = 0,
            spans = $progressFace.children(),
            percent;

        $.each( percentagesFace, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;

        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatusFace();
    }

    function updateTotalProgressInner() {
        var loaded = 0,
            total = 0,
            spans = $progressInner.children(),
            percent;

        $.each( percentagesInner, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;

        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatusInner();
    }

    function updateStatusLogo() {
        var text = '', stats;

        if ( stateLogo === 'ready' ) {
            text = '选中' + fileCountLogo + '张图片，共' + WebUploader.formatSize( fileSizeLogo ) + '。';
        } else if ( stateLogo === 'confirm' ) {
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
    
    function updateStatusFace() {
        var text = '', stats;

        if ( stateFace === 'ready' ) {
            text = '选中' + fileCountFace + '张图片，共' + WebUploader.formatSize( fileSizeFace ) + '。';
        } else if ( stateFace === 'confirm' ) {
            stats = uploaderFace.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张，'+
                    stats.uploadFailNum + '张上传失败'
            }

        } else {
            stats = uploaderFace.getStats();
            text = '共' + fileCountFace + '张（' +
                    WebUploader.formatSize( fileSizeFace )  +
                    '），已上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }

        $infoFace.html( text );
    }

    function updateStatusInner() {
        var text = '', stats;

        if ( stateInner === 'ready' ) {
            text = '选中' + fileCountInner + '张图片，共' + WebUploader.formatSize( fileSizeInner ) + '。';
        } else if ( stateInner === 'confirm' ) {
            stats = uploaderInner.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张，'+
                    stats.uploadFailNum + '张上传失败'
            }

        } else {
            stats = uploaderInner.getStats();
            text = '共' + fileCountInner + '张（' +
                    WebUploader.formatSize( fileSizeInner )  +
                    '），已上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }

        $infoInner.html( text );
    }

    function setStateLogo( val ) {
        var file, stats;

        if ( val === stateLogo ) {
            return;
        }

        $uploadLogo.removeClass( 'state-' + stateLogo );
        $uploadLogo.addClass( 'state-' + val );
        stateLogo = val;

        switch ( stateLogo ) {
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
                    setStateLogo( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploaderLogo.getStats();
                if ( stats.successNum ) {
                    alert( '上传成功' );
                }
                break;
        }

        updateStatusLogo();
    }
    
    function setStateFace( val ) {
        var file, stats;

        if ( val === stateFace ) {
            return;
        }

        $uploadFace.removeClass( 'state-' + stateFace );
        $uploadFace.addClass( 'state-' + val );
        stateFace = val;

        switch ( stateFace ) {
            case 'pedding':
                $placeHolderFace.removeClass( 'element-invisible' );
                $queueFace.parent().removeClass('filled');
                $queueFace.hide();
                $statusBarFace.addClass( 'element-invisible' );
                uploaderFace.refresh();
                break;

            case 'ready':
            	$placeHolderFace.addClass( 'element-invisible' );
                $( '#filePicker2Face' ).removeClass( 'element-invisible');
                $queueFace.parent().addClass('filled');
                $queueFace.show();
                $statusBarFace.removeClass('element-invisible');
                uploaderFace.refresh();
                break;

            case 'uploading':
                $( '#filePicker2Face' ).addClass( 'element-invisible' );
                $progressFace.show();
                $uploadFace.text( '暂停上传' );
                break;

            case 'paused':
                $progressFace.show();
                $uploadFace.text( '继续上传' );
                break;

            case 'confirm':
                $progressFace.hide();
                $uploadFace.text( '开始上传' ).addClass( 'disabled' );

                stats = uploaderFace.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setStateFace( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploaderFace.getStats();
                if ( stats.successNum ) {
                    alert( '上传成功' );
                }
                break;
        }

        updateStatusFace();
    }
    
    function setStateInner( val ) {
        var file, stats;

        if ( val === stateInner ) {
            return;
        }

        $uploadInner.removeClass( 'state-' + stateInner );
        $uploadInner.addClass( 'state-' + val );
        stateInner = val;

        switch ( stateInner ) {
            case 'pedding':
                $placeHolderInner.removeClass( 'element-invisible' );
                $queueInner.parent().removeClass('filled');
                $queueInner.hide();
                $statusBarInner.addClass( 'element-invisible' );
                uploaderInner.refresh();
                break;

            case 'ready':
            	$placeHolderInner.addClass( 'element-invisible' );
                $( '#filePicker2Inner' ).removeClass( 'element-invisible');
                $queueInner.parent().addClass('filled');
                $queueInner.show();
                $statusBarInner.removeClass('element-invisible');
                uploaderInner.refresh();
                break;

            case 'uploading':
                $( '#filePicker2Inner' ).addClass( 'element-invisible' );
                $progressInner.show();
                $uploadInner.text( '暂停上传' );
                break;

            case 'paused':
                $progressInner.show();
                $uploadInner.text( '继续上传' );
                break;

            case 'confirm':
                $progressInner.hide();
                $uploadInner.text( '开始上传' ).addClass( 'disabled' );

                stats = uploaderInner.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setStateInner( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploaderInner.getStats();
                if ( stats.successNum ) {
                    alert( '上传成功' );
                }
                break;
        }

        updateStatusInner();
    }
    
    uploaderLogo.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentagesLogo[ file.id ][ 1 ] = percentage;
        updateTotalProgressLogo();
    };
    uploaderFace.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentagesFace[ file.id ][ 1 ] = percentage;
        updateTotalProgressFace();
    };
    uploaderInner.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');

        $percent.css( 'width', percentage * 100 + '%' );
        percentagesInner[ file.id ][ 1 ] = percentage;
        updateTotalProgressInner();
    };

    uploaderLogo.onFileQueued = function( file ) {
        fileCountLogo++;
        fileSizeLogo += file.size;

        if ( fileCountLogo === 1 ) {
            $placeHolderLogo.addClass( 'element-invisible' );
            $statusBarLogo.show();
        }

        addFileLogo( file );
        setStateLogo( 'ready' );
        updateTotalProgressLogo();
    };
    uploaderFace.onFileQueued = function( file ) {
        fileCountFace++;
        fileSizeFace += file.size;

        if ( fileCountFace === 1 ) {
            $placeHolderFace.addClass( 'element-invisible' );
            $statusBarFace.show();
        }

        addFileFace( file );
        setStateFace( 'ready' );
        updateTotalProgressFace();
    };
    uploaderInner.onFileQueued = function( file ) {
        fileCountInner++;
        fileSizeInner += file.size;

        if ( fileCountInner === 1 ) {
            $placeHolderInner.addClass( 'element-invisible' );
            $statusBarInner.show();
        }

        addFileInner( file );
        setStateInner( 'ready' );
        updateTotalProgressInner();
    };

    uploaderLogo.onFileDequeued = function( file ) {
        fileCountLogo--;
        fileSizeLogo -= file.size;

        if ( !fileCountLogo ) {
            setStateLogo( 'pedding' );
        }

        removeFileLogo( file );
        updateTotalProgressLogo();

    };
    uploaderFace.onFileDequeued = function( file ) {
        fileCountFace--;
        fileSizeFace -= file.size;

        if ( !fileCountFace ) {
            setStateFace( 'pedding' );
        }

        removeFileFace( file );
        updateTotalProgressFace();

    };
    uploaderInner.onFileDequeued = function( file ) {
        fileCountInner--;
        fileSizeInner -= file.size;

        if ( !fileCountInner ) {
            setStateInner( 'pedding' );
        }

        removeFileInner( file );
        updateTotalProgressInner();

    };

    uploaderLogo.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setStateLogo( 'confirm' );
                break;

            case 'startUpload':
                setStateLogo( 'uploading' );
                break;

            case 'stopUpload':
                setStateLogo( 'paused' );
                break;

        }
    });
    uploaderFace.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setStateFace( 'confirm' );
                break;

            case 'startUpload':
                setStateFace( 'uploading' );
                break;

            case 'stopUpload':
                setStateFace( 'paused' );
                break;

        }
    });
    uploaderInner.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                setStateInner( 'confirm' );
                break;

            case 'startUpload':
                setStateInner( 'uploading' );
                break;

            case 'stopUpload':
                setStateInner( 'paused' );
                break;

        }
    });

    uploaderLogo.onError = function( code ) {
        alert( 'Error: ' + code );
    };
    uploaderFace.onError = function( code ) {
        alert( 'Error: ' + code );
    };
    uploaderInner.onError = function( code ) {
        alert( 'Error: ' + code );
    };

    $uploadLogo.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }

        if ( stateLogo === 'ready' ) {
            uploaderLogo.upload();
        } else if ( stateLogo === 'paused' ) {
            uploaderLogo.upload();
        } else if ( stateLogo === 'uploading' ) {
            uploaderLogo.stop();
        }
    });
    $uploadFace.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }

        if ( stateFace === 'ready' ) {
            uploaderFace.upload();
        } else if ( stateFace === 'paused' ) {
            uploaderFace.upload();
        } else if ( stateFace === 'uploading' ) {
            uploaderFace.stop();
        }
    });
    $uploadInner.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }

        if ( stateInner === 'ready' ) {
            uploaderInner.upload();
        } else if ( stateInner === 'paused' ) {
            uploaderInner.upload();
        } else if ( stateInner === 'uploading' ) {
            uploaderInner.stop();
        }
    });

    $infoLogo.on( 'click', '.retry', function() {
        uploaderLogo.retry();
    } );
    $infoFace.on( 'click', '.retry', function() {
        uploaderFace.retry();
    } );
    $infoInner.on( 'click', '.retry', function() {
        uploaderInner.retry();
    } );

    $uploadLogo.addClass( 'state-' + stateLogo );
    $uploadFace.addClass( 'state-' + stateFace );
    $uploadInner.addClass( 'state-' + stateInner );
    
    updateTotalProgressLogo();
    updateTotalProgressFace();
    updateTotalProgressInner();
});