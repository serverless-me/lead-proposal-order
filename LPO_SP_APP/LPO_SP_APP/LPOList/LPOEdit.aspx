<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script src="../../Scripts/jquery-1.8.2.js"></script>
    <script src="../../Scripts/LPO.js"></script>
    <link href="../../Scripts/LPO.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <table id="lpoNav" class="lpoNav">
        <tr>
            <td><div class="navElem" onclick="lpoForm.setVisible('Lead');" id="navLead"><p class="navElem">Lead</p></div></td>
            <td><div class="navElem" onclick="lpoForm.setVisible('Responsibility');" id="navResponsibility"><p class="navElem">Responsibility</p></div></td>
            <td><div class="navElem" onclick="lpoForm.setVisible('Proposal');" id="navProposal"><p class="navElem">Proposal</p></div></td>
            <td><div class="navElem" onclick="lpoForm.setVisible('Mailing');" id="navMailing"><p class="navElem">Mailing</p></div></td>
            <td><div class="navElem" onclick="lpoForm.setVisible('Order');" id="navOrder"><p class="navElem">Order</p></div></td>
            <td><div class="lpoImage" id="customerLogo"></div></td>
            <td><div class="lpoImage" id="contactImage"></div></td>
        </tr>
    </table>
    <WebPartPages:WebPartZone runat="server" FrameType="None" ID="Main" Title="loc:Main" />
</asp:Content>
