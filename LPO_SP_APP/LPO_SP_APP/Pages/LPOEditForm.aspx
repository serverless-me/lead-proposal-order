<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title>Edit LPO</title>

    <script type="text/javascript" src="../Scripts/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <script type="text/javascript">
        'use strict';

        // Festlegen des Formats für die Clientwebpart-Seite, so dass es mit dem Hostweb konsistent ist.
        (function () {
            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();
    </script>
</head>
<body>
    <div id="lpoNav">
        <div class="navElem">Lead</div>
        <div class="navElem">Responsibility</div>
        <div class="navElem">Proposal</div>
        <div class="navElem">Policy</div>
        <div class="navElem">Order</div>
    </div>
    <div id="lpoLead" class="lpoGUI">
        <table class="lpoTbl">
            <tr>
                <td class="lpo">LPO-ID</td>
                <td class="lpo">Title</td>
                <td class="lpo">Status</td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoID" /></td>
                <td class="lpo"><input class="lpo" id="lpoTitle" type="text" /></td>
                <td class="lpo"><label class="lpo" id="lpoStatus" /></td>
            </tr>
            <tr>
                <td class="lpo">Customer</td>
                <td class="lpo">Contact</td>
                <td class="lpo">Estimated Price</td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoCustomer" /></td>
                <td class="lpo">
                    <select class="lpo" id="lpoContact">
                        <option class="lpo">Contact 1</option>
                        <option class="lpo">Contact 2</option>
                        <option class="lpo">Contact 3</option>
                    </select>
                </td>
                <td class="lpo"><input class="lpo" id="lpoEstOrderVolume" type="text" /></td>
            </tr>
            <tr>
                <td class="lpo">Activity</td>
                <td class="lpo">Country</td>
                <td class="lpo">Language</td>
            </tr>
            <tr>
                <td class="lpo">
                    <select class="lpo" id="lpoActivity">
                        <option class="lpo">Activity 1</option>
                        <option class="lpo">Activity 2</option>
                        <option class="lpo">Activity 3</option>
                    </select>
                </td>
                <td class="lpo"><label class="lpo" id="lpoCountry" /></td>
                <td class="lpo"><label class="lpo" id="lpoLanguage" /></td>
            </tr>
            <tr>
                <td class="lpo">Deadline</td>
                <td class="lpo">Project Start</td>
                <td class="lpo">Project End</td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="lpoDeadline" type="date" /></td>
                <td class="lpo"><input class="lpo" id="lpoProjectStart" type="date" /></td>
                <td class="lpo"><input class="lpo" id="lpoProjectEnd" type="date" /></td>
            </tr>
            <tr>
                <td colspan="3">Requirements</td>
            </tr>
            <tr>
                <td colspan="3">
                    <textarea class="lpo" id="lpoRequirements" cols="20" rows="2"></textarea>
                </td>
            </tr>
        </table>
    </div>
    <div id="lpoResponsibility" class="lpoGUI">
        <table class="lpoTbl">
            <tr>
                <td class="lpo">Commercial Manager (CM)</td>
                <td class="lpo">Technical Manager (TM)</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoCM" /></td>
                <td class="lpo"><label class="lpo" id="lpoTM" /></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">CM Editor</td>
                <td class="lpo">TM Editor</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoCMDeputy" /></td>
                <td class="lpo"><label class="lpo" id="lpoTMDeputy" /></td>
                <td class="lpo"></td>
            </tr>
        </table>
    </div>
    <div id="lpoProposal" class="lpoGUI">
        <table class="lpoTbl">            
            <tr>
                <td class="lpo">Internal Production Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpoInternalCost" id="lpo" type="text" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>            
            <tr>
                <td class="lpo">External Production Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="lpoExternalCost" type="text" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>            
            <tr>
                <td class="lpo">Material Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="lpoMaterialCost" type="text" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Total Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoTotalCost" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Offer Price</td>
                <td class="lpo">Marge</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="lpoOfferPrice" type="text" /></td>
                <td class="lpo"><label class="lpo" id="lpoMarge" /></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Risk Classification</td>
                <td class="lpo">Visibility</td>
                <td class="lpo">Contract Type</td>
            </tr>
            <tr>
                <td class="lpo"></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
        </table>
    </div>
    <div id="lpoMailing" class="lpoGUI">
        <table class="lpoTbl">
            <tr>
                <td class="lpo">Proposal Template</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">
                    <select class="lpo" id="lpoTemplate">
                        <option class="lpo">Template 1</option>
                        <option class="lpo">Template 2</option>
                        <option class="lpo">Template 3</option>
                    </select>
                </td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo" colspan="3">
                    Policy Bla Bla Policy Bla Bla Policy Bla Bla Policy Bla Bla Policy Bla Bla 
                    Policy Bla Bla Policy Bla Bla Policy Bla Bla Policy Bla Bla Policy Bla Bla 
                </td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="lpoPolicy" type="checkbox" /></td>
                <td class="lpo">Acknoledge Policy & Accept Terms</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"></td>
                <td class="lpo"></td>
                <td class="lpo"><input class="lpo" id="lpoSend" type="button" /></td>
            </tr>
            <tr>
                <td class="lpo">User</td>
                <td class="lpo">Date</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoSentUser" /></td>
                <td class="lpo"><label class="lpo" id="lpoSentDate" /></td>
                <td class="lpo"></td>
            </tr>
        </table>
    </div>
    <div ic="lpoOrder" class="lpoGUI">
        <table class="lpoTbl">
            <tr>
                <td class="lpo">Project ID</td>
                <td class="lpo">Project Type</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="lpoProjectID" type="text" /></td>
                <td class="lpo">
                    <select class="lpo" id="lpoProjectType">
                        <option class="lpo">Projecttype 1</option>
                        <option class="lpo">Projecttype 2</option>
                        <option class="lpo">Projecttype 3</option>
                    </select>
                </td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Project Lead</td>
                <td class="lpo">Cost Center</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">
                    <select class="lpo" id="lpoProjectLead">
                        <option class="lpo">PjM 1</option>
                        <option class="lpo">PjM 2</option>
                        <option class="lpo">PjM 3</option>
                    </select>
                </td>
                <td class="lpo"><input class="lpo" id="lpoCostCenter" type="text" /></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Notes for Order Management</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo" colspan="3"></td>
            </tr>
            <tr>
                <td class="lpo">Order Coordinator</td>
                <td class="lpo">Order Number</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><label class="lpo" id="lpoOrderCoordinator" /></td>
                <td class="lpo"><input class="lpo" id="lpoOrderNumber" type="text" /></td>
                <td class="lpo"></td>
            </tr>
        </table>
    </div>

</body>
</html>
