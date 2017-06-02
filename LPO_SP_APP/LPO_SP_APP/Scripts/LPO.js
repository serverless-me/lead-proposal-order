/// <reference path="C:\Projects\LayoutsJS\SP.DocumentManagement.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Exp.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Init.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Map.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Policy.debug.js" />
/// <reference path="C:\Projects\LayoutsJS\SP.Publishing.debug.js" />
/// <reference path="C:\Projects\LPO\LPO_SP_APP\LPO_SP_APP\Scripts\jquery-1.8.2.js" />
/// <reference path="C:\Projects\LPO\LPO_SP_APP\LPO_SP_APP\Scripts\jquery-1.8.2.intellisense.js" />
'use strict';
var lpoForm;
$(document).ready(function () {
    lpoForm = new LPOForm();
    lpoForm.setVisible("Lead");
});
function lookupHelper() {
    var lookupItem;
    var lookupItems;
    var fieldName;
    var context;
    var spWeb;;
    this.loadField = function (_listName, _lookupId, _fieldName) {
        fieldName = _fieldName;
        context = SP.ClientContext.get_current();
        spWeb = context.get_web();
        context.load(spWeb);
        lookupItem = spWeb.get_lists().getByTitle(_listName).getItemById(_lookupId);
        context.load(lookupItem);
        context.executeQueryAsync(this.onLoadFieldSuccess, this.onLoadFieldFailure);
    }
    this.onLoadFieldSuccess = function (sender, args) {
        var lookupValue;
        switch (fieldName) {
            case "LPOCompany":
                lookupValue = lookupItem.get_fieldValues()[fieldName].get_lookupValue();
                lpoForm.Customer.setContent(lookupValue);
                break;
            case "Language":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.Language.setContent(lookupValue);
                break;
            case "CM":
                lookupValue = lookupItem.get_fieldValues()[fieldName].get_lookupValue();
                lpoForm.CommercialManager.setContent(lookupValue);
                break;
            case "WorkCountry":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.Country.setContent(lookupValue);
                break;
            case "Deputy":
                lookupValue = lookupItem.get_fieldValues()[fieldName].get_lookupValue();
                lpoForm.CommercialManagerDeputy.setContent(lookupValue);
                break;
            case "WorkAddress":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.Address.setContent(lookupValue);
                break;
            case "WorkCity":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.City.setContent(lookupValue);
                break;
            case "WorkZip":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.ZIP_Postal_Code.setContent(lookupValue);
                break;
            case "WorkState":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.State_Province.setContent(lookupValue);
                break;
            case "CMcp":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.CMcp.setContent(lookupValue);
                break;
            case "CustomerCp":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.CustomerCp.setContent(lookupValue);
                break;
            case "ContactCp":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.ContactCp.setContent(lookupValue);
                break;
            case "CustomerLogo":
                lookupValue = lookupItem.get_fieldValues()[fieldName].get_url();
                lpoForm.CustomerLogo.setContent(lookupValue);
                break;
            case "ContactImage":
                lookupValue = lookupItem.get_fieldValues()[fieldName].get_url();
                lpoForm.ContactImage.setContent(lookupValue);
                break;
            case "Email":
                lookupValue = lookupItem.get_fieldValues()[fieldName];
                lpoForm.Email.setContent(lookupValue);
                break;
        }
    }
    this.onLoadFieldFailure = function (sender, args) {

        alert('Failed to load lpo data. Error:' + args.get_message());
    }
}
function LPOForm() {
    var Lead = new LPOScreen();
    var Responsibilities = new LPOScreen();
    var Proposal = new LPOScreen();
    var Mailing = new LPOScreen();
    var Order = new LPOScreen();
    var Invisible = new LPOScreen();
    // Lead
    this.Title = new TitleFld();
    this.Status = new StatusFld();
    this.Contact = new ContactFld();
    this.Customer = new CustomerFld();
    this.EstOrderVolume = new EstOrderVolumeFld();
    this.Activity = new ActivityFld();
    this.Language = new LanguageFld();
    this.Deadline = new DeadlineFld();
    this.EstProjectStart = new EstProjectStartFld();
    this.EstProjectEnd = new EstProjectEndFld();
    this.Requirements = new RequirementsFld();
    Lead.Add(this.Title);
    Lead.Add(this.Status);
    Lead.Add(this.Contact);
    Lead.Add(this.Customer);
    Lead.Add(this.EstOrderVolume);
    Lead.Add(this.Activity);
    Lead.Add(this.Language);
    Lead.Add(this.Deadline);
    Lead.Add(this.EstProjectStart);
    Lead.Add(this.EstProjectEnd);
    Lead.Add(this.Requirements);
    // Responsibilities
    this.ProposalManager = new ProposalManagerFld();
    this.CommercialManager = new CommercialManagerFld();
    this.CommercialManagerDeputy = new CommercialManagerDeputyFld();
    Responsibilities.Add(this.ProposalManager);
    Responsibilities.Add(this.CommercialManager);
    Responsibilities.Add(this.CommercialManagerDeputy);
    // Proposal
    this.ProductionCostInternal = new ProductionCostInternalFld();
    this.ProductionCostExternal = new ProductionCostExternalFld();
    this.Material = new MaterialFld();
    this.TotalCost = new TotalCostFld();
    this.Price = new PriceFld();
    this.MarginPercentage = new MarginPercentageFld();
    this.Visibility = new VisibilityFld();
    this.RiskClassification = new RiskClassificationFld();
    Proposal.Add(this.ProductionCostInternal);
    Proposal.Add(this.ProductionCostExternal);
    Proposal.Add(this.Material);
    Proposal.Add(this.TotalCost);
    Proposal.Add(this.Price);
    Proposal.Add(this.MarginPercentage);
    Proposal.Add(this.Visibility);
    Proposal.Add(this.RiskClassification);
    // Mailing
    this.AcknowledgePolicy = new AcknowledgePolicyFld();
    this.MailingDate = new MailingDateFld();
    this.MailingUser = new MailingUserFld();
    this.Address = new AddressFld();
    this.Email = new EmailFld();
    this.City = new CityFld();
    this.State_Province = new State_ProvinceFld();
    this.ZIP_Postal_Code = new ZIP_Postal_CodeFld();
    this.Country = new CountryFld();
    this.ProposalDoc = new ProposalDocFld();
    Mailing.Add(this.AcknowledgePolicy);
    Mailing.Add(this.MailingDate);
    Mailing.Add(this.MailingUser);
    Mailing.Add(this.Email);
    Mailing.Add(this.Address);
    Mailing.Add(this.City);
    Mailing.Add(this.State_Province);
    Mailing.Add(this.ZIP_Postal_Code);
    Mailing.Add(this.Country);
    Mailing.Add(this.ProposalDoc);
    this.CMcp = new CMcpFld();
    this.CustomerCp = new CustomerCpFld();
    this.ContactCp = new ContactCpFld();
    this.CustomerLogo = new CustomerLogoFld();
    this.ContactImage = new ContactImageFld();
    Invisible.Add(this.CMcp);
    Invisible.Add(this.CustomerCp);
    Invisible.Add(this.CustomerLogo);
    Invisible.Add(this.ContactCp);
    Invisible.Add(this.ContactImage);
    // Order
    this.OrderCoordinator = new OrderCoordinatorFld();
    this.NoteToOrderManagement = new NoteToOrderManagementFld();
    Order.Add(this.OrderCoordinator);
    Order.Add(this.NoteToOrderManagement);
    this.setVisible = function (pageName) {
        Lead.Hide();
        Responsibilities.Hide();
        Proposal.Hide();
        Mailing.Hide();
        Order.Hide();
        Invisible.Hide();
        switch (pageName) {
            case "Lead":
                Lead.Show();
                break;
            case "Responsibility":
                Responsibilities.Show();
                break;
            case "Proposal":
                Proposal.Show();
                break;
            case "Mailing":
                Mailing.Show();
                break;
            case "Order":
                Order.Show();
                break;
        }
    }
    this.calculateCost = function () {
        var x = parseFloat(this.ProductionCostInternal.getContent()); 
        var y = parseFloat(this.ProductionCostExternal.getContent()); 
        var z = parseFloat(this.Material.getContent());
        var totalCost = x + y + z;
        // TODO: TotalCost Feld anlegen
        this.TotalCost.setContent(totalCost);
    }
    this.calculateMarge = function () {
        var actMargin = "";
        if (this.TotalCost.getContent() > 0) {
            actMargin = ((parseFloat(this.Price.getContent()) / parseFloat(this.TotalCost.getContent())) - 1) * 100;
            actMargin = Math.round(actMargin);
        }
        this.MarginPercentage.setContent(actMargin);
    }
}
function LPOScreen() {
    var array = new Array();
    this.Add = function (lpoFld) {
        array.push(lpoFld);
    }
    this.Hide = function () {
        for (var i = 0; i < array.length; i++) {
            array[i].Hide();
        }
    }
    this.Show = function () {
        for (var i = 0; i < array.length; i++) {
            array[i].Show();
        }
    }
}
function TitleFld() {
    var selector = "input[Title='Title']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function StatusFld() {
    var selector = "input[title='Status']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ContactFld() {
    var selector = "select[Title='Contact']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    
    control.change(function () {
        lpoForm.Contact.setContent();
    });
    this.getContent = function () {
        var selectedOption = control.children("option:selected");
        return selectedOption.text();
    };
    this.setContent = function () {
        var selectedOption = control.children("option:selected");
        var selectedOptionVal = selectedOption.attr("value");
        selectedOptionVal = parseInt(selectedOptionVal);
        lpoForm.ContactCp.setContent(selectedOption.text());
        // Customer
        this.lookupCustomer = new lookupHelper();
        this.lookupCustomer.loadField("Contacts", selectedOptionVal, "LPOCompany");
        // Language
        this.lookupLanguage = new lookupHelper();
        this.lookupLanguage.loadField("Contacts", selectedOptionVal, "Language");
        // ContactImage
        this.lookupContactImage = new lookupHelper();
        this.lookupContactImage.loadField("Contacts", selectedOptionVal, "ContactImage");
        // Email
        this.lookupEmail = new lookupHelper();
        this.lookupEmail.loadField("Contacts", selectedOptionVal, "Email");

    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CustomerFld() {
    var selector = "select[Title='Customer']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    control.change(function () {
        this.setContent(control.val());
    });
    this.getContent = function () {
        var optionSelector = "option:contains('" + v + "')";
        var selectedOption = control.children(optionSelector);
        return selectedOption.val();
    };
    this.setContent = function (v) {
        var optionSelector = "option:contains('" + v + "')";
        var selectedOption = control.children(optionSelector);
        selectedOption.attr("selected", "true");
        var selectedOptionVal = parseInt(selectedOption.val());
        lpoForm.CustomerCp.setContent(selectedOption.text());
        // CM
        this.lookupCM = new lookupHelper();
        this.lookupCM.loadField("Customers", selectedOptionVal, "CM");
        //// Address
        this.lookupAddress = new lookupHelper();
        this.lookupAddress.loadField("Customers", selectedOptionVal, "WorkAddress");
        // City
        this.lookupCity = new lookupHelper();
        this.lookupCity.loadField("Customers", selectedOptionVal, "WorkCity");
        // ZIP
        this.lookupZIP = new lookupHelper();
        this.lookupZIP.loadField("Customers", selectedOptionVal, "WorkZip");
        // Province
        this.lookupProvince = new lookupHelper();
        this.lookupProvince.loadField("Customers", selectedOptionVal, "WorkState");
        // Country
        this.lookupCountry = new lookupHelper();
        this.lookupCountry.loadField("Customers", selectedOptionVal, "WorkCountry");
        // CustomerLogo
        this.lookupLogo = new lookupHelper();
        this.lookupLogo.loadField("Customers", selectedOptionVal, "CustomerLogo");
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function EstOrderVolumeFld() {
    var selector = "input[Title='Estimated Order Volume']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.change(function () {
        // TODO: Calculate Risk
    });
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ActivityFld() {
    var selector = "select[Title='Activity']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function LanguageFld() {
    var selector = "select[Title='Language']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        var optionSelector = "option[value='"+v+"']";
        var selectedOption = control.children(optionSelector);
        selectedOption.attr("selected", "true");
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CountryFld() {
    var selector = "input[Title='Country/Region']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function DeadlineFld() {
    var selector = "input[title='Deadline']";
    var control = $(selector);
    var controlTR = control.parents("table:first").parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function EstProjectStartFld() {
    var selector = "input[Title='Estimated Project Start']";
    var control = $(selector);
    var controlTR = control.parents("table:first").parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function EstProjectEndFld() {
    var selector = "input[Title='Estimated Project End']";
    var control = $(selector);
    var controlTR = control.parents("table:first").parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function RequirementsFld() {
    var selector = "textarea[Title='Requirements']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ProposalManagerFld() {
    var selector = "input[Title='Proposal Manager']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function OrderCoordinatorFld() {
    var selector = "input[Title='Order Coordinator']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CommercialManagerFld() {
    var selector = "select[title='Commercial Manager']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    control.change(function () {
        // TODO
    });
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        var optionSelector = "option:contains('" + v + "')";
        var selectedOption = control.children(optionSelector);
        selectedOption.attr("selected", "true");
        lpoForm.CMcp.setContent(selectedOption.text());
        // TODO: Load Deputy                
        var selectedOptionVal = control.children("option:selected").attr("value");
        selectedOptionVal = parseInt(selectedOptionVal);
        this.lookupCMDeputy = new lookupHelper();
        this.lookupCMDeputy.loadField("Profiles", selectedOptionVal, "Deputy");
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CommercialManagerDeputyFld() {
    var selector = "input[Title='Commercial Manager Deputy']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ProductionCostInternalFld() {
    var selector = "input[Title='Internal Production Cost']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.change(function () {
        // TODO: Calculate Total Cost
        lpoForm.calculateCost();
    });
    control.val("0");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ProductionCostExternalFld() {
    var selector = "input[Title='External Production Cost']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.change(function () {
        // TODO: Calculate Total Cost
        lpoForm.calculateCost();
    });
    control.val("0");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function MaterialFld() {
    var selector = "input[Title='Material Cost']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.change(function () {
        // TODO: Calculate Total Cost
        lpoForm.calculateCost();
    });
    control.val("0");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function TotalCostFld() {
    var selector = "input[Title='Total Cost']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
        lpoForm.calculateMarge();
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function PriceFld() {
    var selector = "input[Title='Price']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.change(function () {
        // TODO: Calculate Marge
        lpoForm.calculateMarge();
    });
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function MarginPercentageFld() {
    var selector = "input[Title='Margin Percentage']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function VisibilityFld() {
    var selector = "input[Title='Non Disclosure']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function RiskClassificationFld() {
    var selector = "select[Title='Risk Classification']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function AcknowledgePolicyFld() {
    var selector = "input[Title='Acknowledge Policy']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function MailingDateFld() {
    var selector = "input[Title='Mailing Date']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function MailingUserFld() {
    var selector = "input[Title='Mailing User']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function AddressFld() {
    var selector = "textarea[Title='Address']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function EmailFld() {
    var selector = "input[Title='E-Mail']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CityFld() {
    var selector = "input[Title='City']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function State_ProvinceFld() {
    var selector = "input[Title='State/Province']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ZIP_Postal_CodeFld() {
    var selector = "input[Title='ZIP/Postal Code']";
    var control = $(selector);
    control.attr("disabled", "true");
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ProposalDocFld() {
    var selector = "select[Title='ProposalDoc']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function NoteToOrderManagementFld() {
    var selector = "textarea[Title='Note To Order Management']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}

function CMcpFld() {
    var selector = "input[Title='CMcp']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CustomerCpFld() {
    var selector = "input[Title='CustomerCp']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ContactCpFld() {
    var selector = "input[Title='ContactCp']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function CustomerLogoFld() {
    var selector = "input[Title='CustomerLogo']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true");
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
        var imgSrc = "<img src='" + v + "' height='80px' />";
        $("#customerLogo").append(imgSrc);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}
function ContactImageFld() {
    var selector = "input[Title='ContactImage']";
    var control = $(selector);
    var controlTR = control.parents("tr:first");
    control.attr("disabled", "true"); 
    this.getContent = function () {
        return control.val();
    };
    this.setContent = function (v) {
        control.val(v);
        var imgSrc = "<img src='" + v + "' height='80px' />";
        $("#contactImage").append(imgSrc);
    };
    this.Hide = function () {
        controlTR.hide();
    };
    this.Show = function () {
        controlTR.show();
    };
}