<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script src="../Scripts/jquery-1.8.2.js" type="text/javascript"></script>
    <script src="../Scripts/App.js" type="text/javascript"></script>
    <script src="../Scripts/GUI.js"></script>
    <link href="../Scripts/LPO.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    

    <div id="lpoLead" class="lpoGUI">
        <table class="lpoTbl">
            <tr>
                <td class="lpo">LPO-ID</td>
                <td class="lpo">Title</td>
                <td class="lpo">Status</td>
            </tr>
            <tr>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOID" onchange="currLPO.setLPOID(null);" /></td>
                <td class="lpo"><input class="lpo" id="txLPOTitle" type="text" onchange="currLPO.setLPOTitle(null);" /></td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOStatus" onchange="currLPO.setLPOStatus(null);" /></td>
            </tr>
            <tr>
                <td class="lpo">Contact</td>
                <td class="lpo">Customer</td>
                <td class="lpo">Estimated Price</td>
            </tr>
            <tr>
                <td class="lpo">
                    <select class="lpo" id="ddLPOContact">
                    </select>
                </td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOCustomer" onchange="currLPO.setLPOCustomer(null);" /></td>
                <td class="lpo"><input class="lpo" id="txLPOEstOrderVolume" type="text" onchange="currLPO.setLPOEstOrderVolume(null);" /></td>
            </tr>
            <tr>
                <td class="lpo">Activity</td>
                <td class="lpo">Country</td>
                <td class="lpo">Language</td>
            </tr>
            <tr>
                <td class="lpo">
                    <select class="lpo" id="ddLPOActivity" >
                        <option class="lpo">Enterprise Strategy</option>
                        <option class="lpo">Consulting</option>
                        <option class="lpo">Development</option>
                        <option class="lpo">Technical Support</option>
                        <option class="lpo">Project Management</option>
                    </select>
                </td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOCountry" onchange="currLPO.setLPOCountry(null);" /></td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOLanguage" onchange="currLPO.setLPOLanguage(null);" /></td>
            </tr>
            <tr>
                <td class="lpo">Deadline</td>
                <td class="lpo">Project Start</td>
                <td class="lpo">Project End</td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="dtLPODeadline" type="date" onchange="currLPO.setLPODeadline(null);" /></td>
                <td class="lpo"><input class="lpo" id="dtLPOProjectStart" type="date" onchange="currLPO.setLPOProjectStart(null);" /></td>
                <td class="lpo"><input class="lpo" id="dtLPOProjectEnd" type="date" onchange="currLPO.setLPOProjectEnd(null);" /></td>
            </tr>
            <tr>
                <td colspan="3">Requirements</td>
            </tr>
            <tr>
                <td colspan="3">
                    <textarea class="lpo" id="taLPORequirements" cols="40" rows="5" ></textarea>
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
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOCM" onchange="currLPO.setLPOCM(null);" /></td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOTM" onchange="currLPO.setLPOTM(null);" /></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">CM Deputy</td>
                <td class="lpo">TM Deputy</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOCMDeputy" onchange="currLPO.setLPOCMDeputy(null);" /></td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOTMDeputy" onchange="currLPO.setLPOTMDeputy(null);" /></td>
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
                <td class="lpo"><input class="lpo" id="txLPOInternalCost" type="text" onchange="currLPO.setLPOInternalCost(null);" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>            
            <tr>
                <td class="lpo">External Production Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="txLPOExternalCost" type="text" onchange="currLPO.setLPOExternalCost(null);" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>            
            <tr>
                <td class="lpo">Material Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="txLPOMaterialCost" type="text" onchange="currLPO.setLPOMaterialCost(null);" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Total Cost</td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOTotalCost" onchange="currLPO.setLPOTotalCost(null);" /></td>
                <td class="lpo"></td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo">Offer Price</td>
                <td class="lpo">Marge</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input class="lpo" id="txLPOOfferPrice" type="text" onchange="currLPO.setLPOOfferPrice(null);" /></td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOMarge" onchange="currLPO.setLPOMarge(null);" /></td>
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
                    <select class="lpo" id="ddLPOTemplate" onchange="currLPO.setLPOTemplate();">
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
                <td class="lpo"><input class="lpo" id="cbLPOPolicy" type="checkbox" onchange="currLPO.setLPOPolicy(null);" /></td>
                <td class="lpo">Acknoledge Policy & Accept Terms</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"></td>
                <td class="lpo"></td>
                <td class="lpo"><input class="lpo" id="btLPOSend" type="button" /></td>
            </tr>
            <tr>
                <td class="lpo">User</td>
                <td class="lpo">Date</td>
                <td class="lpo"></td>
            </tr>
            <tr>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOSentUser" onchange="currLPO.setLPOSentUser(null);" /></td>
                <td class="lpo"><input type="text" readonly="readonly" disabled="disabled" class="lpo" id="lbLPOSentDate" onchange="currLPO.setLPOSentDate(null);" /></td>
                <td class="lpo"></td>
            </tr>
        </table>
    </div>
    <div id="lpoStatusBar" class="lpoGUI">
    </div>
</asp:Content>
