<%-- Die folgenden vier Zeilen sind ASP.NET-Direktiven, die bei der Verwendung von SharePoint-Komponenten erforderlich sind. --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- Markup und Skript im folgenden Inhaltselement werden im <head> der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <!-- Fügen Sie Ihre CSS-Stile der folgenden Datei hinzu. -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" /></script>
</asp:Content>

<%-- Das Markup im folgenden Inhaltselement wird im TitleArea der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>


<%-- Markup und Skript im folgenden Inhaltselement werden im <body> der Seite platziert. --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
<link href="../Scripts/LPO.css" rel="stylesheet" />
<div class="tiles">
    <div class="tile" onclick="window.location.href('../Lists/LPOList')">
        <p class="tile">
            LPOs
        </p>
    </div>
    <div class="tile" onclick="window.location.href('../Lists/Customers')">
        <p class="tile">
            Customers
        </p>
    </div>
    <div class="tile" onclick="window.location.href('../Lists/Contacts')">
        <p class="tile">
            Contacts
        </p>
    </div>
    <div class="tile" onclick="window.location.href('../Lists/Profiles')">
        <p class="tile">
            Profiles
        </p>
    </div>
    <div class="tile" onclick="window.location.href('../Lists/ContactImages')">
        <p class="tile">
            Images
        </p>
    </div>
    <div class="tile" onclick="window.location.href('../Lists/CustomerLogos')">
        <p class="tile">
            Logos
        </p>
    </div>
    <div class="tile" onclick="window.location.href('../Lists/Proposals')">
        <p class="tile">
            Proposals
        </p>
    </div>
    <div class="tile" onclick="window.location.href('EditFormLPO.aspx')">
        <p class="tile">
            Edit LPO
        </p>
    </div>
</div>
</asp:Content>
