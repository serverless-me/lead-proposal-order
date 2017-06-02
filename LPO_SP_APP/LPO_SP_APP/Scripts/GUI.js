/// <reference path="C:\Projects\LayoutsJS\SP.RequestExecutor.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Ribbon.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Runtime.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Core.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Core.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.dateTimeUtil.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.DocumentManagement.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Exp.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Init.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Map.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Policy.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Publishing.debug.js" />
/// <reference path="C:\Projects\LPO\LPO_SP_APP\LPO_SP_APP\Scripts\jquery-1.8.2.js" />
/// <reference path="C:\Projects\LPO\LPO_SP_APP\LPO_SP_APP\Scripts\jquery-1.8.2.intellisense.js" />
'use strict';

var masks = new Array();
masks.push({gui:'#lpoLead',nav:'#navLead'});
masks.push({gui:'#lpoResponsibility',nav:'#navResponsibility'});
masks.push({gui:'#lpoProposal',nav:'#navProposal'});
masks.push({gui:'#lpoMailing',nav:'#navMailing'});
masks.push({gui:'#lpoOrder',nav:'#navOrder'});
masks.push({gui:'#lpoStatusBar',nav:'#navStatusBar'});

function showGUI(maskTitle) {
    for (var i = 0; i < masks.length; i++) {
        if (masks[i].gui === maskTitle) {
            $(masks[i].gui).show();
            $(masks[i].nav).removeClass("navElem");
            $(masks[i].nav).addClass("NavElemActive");
        }
        else {
            $(masks[i].gui).hide();
            $(masks[i].nav).removeClass("NavElemActive");
            $(masks[i].nav).addClass("navElem");
        }
    }
}

$(document).ready(function () {
    showGUI('#lpoLead');
});