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

var context = SP.ClientContext.get_current();
var spWeb;
var item;
var lpoList = "LPO-List";
var currLPO;

// Dieser Code wird ausgeführt, wenn das DOM bereit ist. Es wird ein Kontextobjekt erstellt, das zur Verwendung des SharePoint-Objektmodells erforderlich ist.
$(document).ready(function () {
    loadLPOData(2);


});

// ==================================================
// === Retrieve Item
// ==================================================
function loadLPOData(id) {
    spWeb = context.get_web();
    item = spWeb.get_lists().getByTitle(lpoList).getItemById(id);

    context.load(item);
    context.executeQueryAsync(onGetLPODataSuccess, onGetLPODataFail);
}

// Diese Funktion wird ausgeführt, wenn der obige Aufruf erfolgreich ist.
// Hierbei werden die Inhalte des 'message'-Elements durch den Benutzernamen ersetzt.
function onGetLPODataSuccess() {
    currLPO = new lpoItem();
    currLPO.setLPOID(item.get_fieldValues().ID);
    currLPO.setLPOTitle(item.get_fieldValues().Title);
    currLPO.setLPOCustomer(item.get_fieldValues().Customer);
    currLPO.setLPOEstOrderVolume(item.get_fieldValues().EstimatedOrderVolume);
    currLPO.setLPOCountry(item.get_fieldValues().WorkCountry);
    currLPO.setLPOLanguage(item.get_fieldValues().Language1);
    currLPO.setLPODeadline(item.get_fieldValues().Deadline);
    currLPO.setLPOProjectStart(item.get_fieldValues().EstProjectStart);
    currLPO.setLPOProjectEnd(item.get_fieldValues().EstProjectEnd);
    currLPO.setLPORequirements(item.get_fieldValues().Requirements);
    currLPO.setLPOCMDeputy(item.get_fieldValues().CommercialManagerDeputy);
    currLPO.setLPOInternalCost(item.get_fieldValues().ProductionCostInternal);
    currLPO.setLPOExternalCost(item.get_fieldValues().ProductionCostExternal);
    currLPO.setLPOMaterialCost(item.get_fieldValues().Material);
    //currLPO.setLPOTotalCost(item.get_fieldValues().XY);
    currLPO.setLPOOfferPrice(item.get_fieldValues().Price);
    currLPO.setLPOMarge(item.get_fieldValues().MargePercentage);
    //currLPO.setLPOTemplate(item.get_fieldValues().XY);
    currLPO.setLPOPolicy(item.get_fieldValues().AcknowledgePolicy);
    currLPO.setLPOSentUser(item.get_fieldValues().TransmissionUser);
    currLPO.setLPOSentDate(item.get_fieldValues().TransmissionDate);
    currLPO.setLPOProjectID(item.get_fieldValues().ProjectID);
    //currLPO.setLPOProjectType(item.get_fieldValues().XY);
    currLPO.setLPOCostCenter(item.get_fieldValues().CostCenter);
    currLPO.setLPOOrderCoordinator(item.get_fieldValues().OrderCoordinator);
    currLPO.setLPOOrderNumber(item.get_fieldValues().OrderNumber);
    // Contacts
    fillContacts();
    currLPO.setLPOContact(item.get_fieldValues().Contact);
    // Activity
    currLPO.setLPOActivity(item.get_fieldValues().Activity);
    // Lookup in Profiles List: 
    currLPO.setLPOCM(item.get_fieldValues().CommercialManager);
    currLPO.setLPOTM(item.get_fieldValues().ProposalManager);
    // Project Lead:
    // Selectable of Profiles List (Filter: Type PjM) / Fills Cost Center
    //currLPO.setLPOProjectLead(item.get_fieldValues().XY);
    // Status: 
    // Depending on Progress => Influences Visibility of Masks
    currLPO.setLPOStatus(item.get_fieldValues().LPOStatus);
    currLPO.itemLoaded = true;

    $("#ddLPOContact").change(function () {
        currLPO.setLPOContact(null);
    });
    $("#ddLPOActivity").change(function () {
        currLPO.setLPOActivity(null);
    });
    $("#taLPORequirements").change(function () {
        currLPO.setLPORequirements(null);
    });
}

// Diese Funktion wird ausgeführt, wenn der obige Aufruf fehlschlägt.
function onGetLPODataFail(sender, args) {
    alert('Failed to get lpo data. Error:' + args.get_message());
}

// ==================================================
// === Update Item Field
// ==================================================

var updateArray = new Array();

function updateSPItem(_fieldName, _fieldValue) {
    var helper = new updateHelper();
    helper.updateSPItem(_fieldName, _fieldValue);
}

function updateHelper() {
    var updateItem;
    var fieldName;
    var fieldValue;
    
    this.updateSPItem = function (_fieldName, _fieldValue) {
            updateItem = item;
            fieldName = _fieldName;
            fieldValue = _fieldValue;
            context.load(updateItem);
            updateItem.set_item(fieldName, fieldValue);
            updateItem.update();
            context.executeQueryAsync(this.onUpdateItemSuccess, this.onUpdateItemFailure);
    }

    this.onUpdateItemSuccess = function (sender, args) {
        var now = new Date();
        $("#lpoStatusBar").append("<p>Update Successfull: " + fieldName + " with " + fieldValue + " (" + now.getHours() + ":" + now.getMinutes() + ")</p>");
        if (updateArray.length > 0) {
            var tuple = updateArray[0];
            updateSPItem(tuple.fname, tuple.fvalue);
            updateArray.shift();
        }
    }

    this.onUpdateItemFailure = function (sender, args) {
        var now = new Date();
        $("#lpoStatusBar").append("<p>Update Pending: " + fieldName + " with " + fieldValue + " (" + now.getHours() + ":" + now.getMinutes() + ")</p>");
        for (var i = 0;i<updateArray.length;i++){
            if (updateArray[0].fname === fieldName) return;
        }
        updateArray.push({ fname: fieldName, fvalue: fieldValue });
    }
}
// ==================================================
// === Retrieve Field from item by List
// ==================================================


function lookupHelper() {

    var lookupItem;
    var lookupItems;
    var fieldName;
    
    this.loadField = function (_listName, _lookupId, _fieldName) {
        fieldName = _fieldName;
        lookupItem = spWeb.get_lists().getByTitle(_listName).getItemById(_lookupId);
        context.load(lookupItem);
        context.executeQueryAsync(this.onLoadFieldSuccess, this.onLoadFieldFailure);
    }

    this.lookupField = function (_listName, _lookupValue, _fieldName) {
        fieldName = _fieldName;
        var query = new SP.CamlQuery();
        query.set_viewXml(
            "<View><Query><Where><Eq>" +
            "<FieldRef Name='Title'/>" +
            "<Value Type='Text'>" + _lookupValue + "</Value>" +
            "</Eq></Where></Query><RowLimit>1</RowLimit></View>");
        lookupItems = spWeb.get_lists().getByTitle(_listName).getItems(query);
        context.load(lookupItems, 'Include(' + fieldName + ')');
        context.executeQueryAsync(this.onLoadFieldSuccess, this.onLoadFieldFailure);
    }

    this.onLoadFieldSuccess = function (sender, args) {
        switch (fieldName) {
            case "LPOCompany":
                currLPO.setLPOCustomer(lookupItem.get_fieldValues().LPOCompany.get_lookupValue());
                break;
            case "Language":
                currLPO.setLPOLanguage(lookupItem.get_fieldValues().Language);
                break;
            case "CM":
                currLPO.setLPOCM(lookupItems.itemAt(0).get_fieldValues().CM.get_lookupValue());
                break;
            case "WorkCountry":
                currLPO.setLPOCountry(lookupItems.itemAt(0).get_fieldValues().WorkCountry);
                break;
            case "Deputy":
                currLPO.setLPOCMDeputy(lookupItems.itemAt(0).get_fieldValues().Deputy);
                break;
        }
    }

    this.onLoadFieldFailure = function (sender, args) {
        alert('Failed to load lpo data. Error:' + args.get_message());
    }
}
// ==================================================
// === Fill Contacts Lookup
// ==================================================
var contactItems;

function fillContacts() {
    contactItems = spWeb.get_lists().getByTitle("Contacts").getItems(SP.CamlQuery.createAllItemsQuery());
    context.load(contactItems, "Include(Id, Title)");
    context.executeQueryAsync(onContactsSuccess, onContactsFailure);
}

function onContactsSuccess(sender, args) {
    for (var i = 0; i < contactItems.get_count() ; i++) {
        var spItem = contactItems.get_item(i);
        var itemID = spItem.get_id();
        var itemTitle = spItem.get_fieldValues().Title;
        var optiontext = "<option value=\"" + itemID + "\">" + itemTitle + "</option>";
        $("#ddLPOContact").append(optiontext);
    }
}

function onContactsFailure(sender, args) {
    alert('Failed to load contacts. Error:' + args.get_message());
}




// ==================================================
// === LPO Item Object
// ==================================================

function lpoItem() {
    this.itemLoaded = false;

    this.lbLPOID = "";
    this.getLPOID = function () { return this.lbLPOID; };
    this.setLPOID = function (v) {
        if (v !== null) {
            this.lbLPOID = v;
            $('#lbLPOID').val(this.lbLPOID);
        }
    };
    this.txLPOTitle = "";
    this.getLPOTitle = function () { return this.txLPOTitle; };
    this.setLPOTitle = function (v) {
        if (v !== undefined) {
            this.txLPOTitle = v;
            if (v !== null) {
                this.txLPOTitle = v;
                $('#txLPOTitle').val(this.txLPOTitle);
            } else if (this.txLPOTitle === null && $('#txLPOTitle').val() !== undefined) {
                this.txLPOTitle = $('#txLPOTitle').val();
                if (this.itemLoaded) { updateSPItem("Title", this.txLPOTitle); }
            }
        }
    };
    this.lbLPOStatus = "";
    this.getLPOStatus = function () { return this.lbLPOStatus; };
    this.setLPOStatus = function (v) {
        if (v !== undefined) {
            this.lbLPOStatus = v;
            if (v !== null) {
                
                $('#txLPOTitle').val(this.lbLPOStatus);
            } else if (this.lbLPOStatus === null && $('#lbLPOStatus').val() !== undefined) {
                this.lbLPOStatus = $('#lbLPOStatus').val();
                if (this.itemLoaded) updateSPItem("LPOStatus", this.lbLPOStatus);
            }
        }
    };
    this.ddLPOContact = "";
    this.getLPOContact = function () { return this.ddLPOContact; };
    this.setLPOContact = function (v) {
        if (v !== undefined) {
            this.ddLPOContact = v;
            if (v !== null) {
                this.contactSelector = '#ddLPOContact option:contains('+this.ddLPOContact+')'
                $(this.contactSelector).attr('selected', true);
            } else if (this.ddLPOContact === null && $("#ddLPOContact option:selected").html() !== undefined) {
                this.ddLPOContact = $("#ddLPOContact option:selected").html();
                if (this.itemLoaded) {
                    updateSPItem("Contact", this.ddLPOContact);
                    this.contactId = parseInt($("#ddLPOContact option:selected").attr("value"));
                    // Customer
                    this.lookupContact = new lookupHelper();
                    this.lookupContact.loadField("Contacts", this.contactId, "LPOCompany");
                    // Language
                    this.lookupLanguage = new lookupHelper();
                    this.lookupLanguage.loadField("Contacts", this.contactId, "Language");
                }
            }
        }
    };
    this.lbLPOCustomer = "";
    this.getLPOCustomer = function () { return this.lbLPOCustomer; };
    this.setLPOCustomer = function (v) {
        if (v !== undefined) {
            this.lbLPOCustomer = v;
            $('#lbLPOCustomer').val(this.lbLPOCustomer);
            if (this.itemLoaded) {
                updateSPItem("Customer", this.lbLPOCustomer);
                this.contactId = parseInt($("#ddLPOContact option:selected").attr("value"));
                // CM
                this.lookupCM = new lookupHelper();
                this.lookupCM.lookupField("Customers", this.lbLPOCustomer, "CM");
                //// Address
                //this.lookupAddress = new lookupHelper();
                //this.lookupAddress.loadField("Customers", this.lookupCustomerId, "Address", this.setLPOxy);
                //// City
                //this.lookupCity = new lookupHelper();
                //this.lookupCity.loadField("Customers", this.lookupCustomerId, "City", this.setLPOxy);
                //// ZIP
                //this.lookupZIP = new lookupHelper();
                //this.lookupZIP.loadField("Customers", this.lookupCustomerId, "ZIP", this.setLPOxy);
                //// Province
                //this.lookupProvince = new lookupHelper();
                //this.lookupProvince.loadField("Customers", this.lookupCustomerId, "Province", this.setLPOxy);
                // Country
                this.lookupCountry = new lookupHelper();
                this.lookupCountry.lookupField("Customers", this.lbLPOCustomer, "WorkCountry");
            }
        }
    };
    this.txLPOEstOrderVolume = "";
    this.getLPOEstOrderVolume = function () { return this.txLPOEstOrderVolume; };
    this.setLPOEstOrderVolume = function (v) {
        if (v !== undefined) {
            this.txLPOEstOrderVolume = v;
            if (v !== null) {
                $('#txLPOEstOrderVolume').val(this.txLPOEstOrderVolume);
            } else if (this.txLPOEstOrderVolume === null && $('#txLPOEstOrderVolume').val() !== undefined) {
                this.txLPOEstOrderVolume = $('#txLPOEstOrderVolume').val();
                if (this.itemLoaded) {
                    updateSPItem("EstimatedOrderVolume", this.txLPOEstOrderVolume);
                }
            }
        }
    };
    this.ddLPOActivity = "";
    this.getLPOActivity = function () { return this.ddLPOActivity; };
    this.setLPOActivity = function (v) {
        if (v !== undefined) {
            this.ddLPOActivity = v;
            if (v !== null) {
                this.activitySelector = '#ddLPOActivity option:contains(' + this.ddLPOActivity + ')'
                $(this.activitySelector).attr('selected', true);
            } else if (this.ddLPOActivity === null && $('#ddLPOActivity').val() !== undefined) {
                this.ddLPOActivity = $('#ddLPOActivity option:selected').val();
                if (this.itemLoaded) {
                    updateSPItem("Activity", this.ddLPOActivity);
                }
            }
        }
    };
    this.lbLPOCountry = "";
    this.getLPOCountry = function () { return this.lbLPOCountry; };
    this.setLPOCountry = function (v) {
        if (v !== undefined) {
            this.lbLPOCountry = v;
            $('#lbLPOCountry').val(this.lbLPOCountry);
            if (this.itemLoaded) {
                updateSPItem("WorkCountry", this.lbLPOCountry);
            }
        }
    };
    this.lbLPOLanguage = "";
    this.getLPOLanguage = function () { return this.lbLPOLanguage; };
    this.setLPOLanguage = function (v) {
        if (v !== undefined) {
            this.lbLPOLanguage = v;
            $('#lbLPOLanguage').val(this.lbLPOLanguage);
            if (this.itemLoaded) {
                updateSPItem("Language1", this.lbLPOLanguage);
            }
            
        }
    };
    this.dtLPODeadline = "";
    this.getLPODeadline = function () { return this.dtLPODeadline; };
    this.setLPODeadline = function (v) {
        if (v !== undefined) {
            this.dtLPODeadline = v;
            if (v !== null) {
                $('#dtLPODeadline').val(this.dtLPODeadline);
            } else if (this.dtLPODeadline === null && $('#dtLPODeadline').val() !== undefined) {
                this.dtLPODeadline = $('#dtLPODeadline').val();
                if (this.itemLoaded) {
                    updateSPItem("Deadline", this.dtLPODeadline);
                }
            }
        }
    };
    this.dtLPOProjectStart = "";
    this.getLPOProjectStart = function () { return this.dtLPOProjectStart; };
    this.setLPOProjectStart = function (v) {
        if (v !== undefined) {
            this.dtLPOProjectStart = v;
            if (v !== null) {
                
                $('#dtLPOProjectStart').val(this.dtLPOProjectStart);
            } else if (this.dtLPOProjectStart === null && $('#dtLPOProjectStart').val() !== undefined) {
                this.dtLPOProjectStart = $('#dtLPOProjectStart').val();
                if (this.itemLoaded) {
                    updateSPItem("EstProjectStart", this.dtLPOProjectStart);
                }
            }
        }
    };
    this.dtLPOProjectEnd = "";
    this.getLPOProjectEnd = function () { return this.dtLPOProjectEnd; };
    this.setLPOProjectEnd = function (v) {
        if (v !== undefined) {
            this.dtLPOProjectEnd = v;
            if (v !== null) {
                
                $('#dtLPOProjectEnd').val(this.dtLPOProjectEnd);
            } else if (this.dtLPOProjectEnd === null && $('#dtLPOProjectEnd').val() !== undefined) {
                this.dtLPOProjectEnd = $('#dtLPOProjectEnd').val();
                if (this.itemLoaded) {
                    updateSPItem("EstProjectEnd", this.dtLPOProjectEnd);
                }
            }
        }
    };
    this.taLPORequirements = "";
    this.getLPORequirements = function () { return this.taLPORequirements; };
    this.setLPORequirements = function (v) {
        if (v !== undefined) {
            this.taLPORequirements = v;
            if (v !== null) {
                
                $('#taLPORequirements').val(this.taLPORequirements);
            } else if (this.taLPORequirements === null && $('#taLPORequirements').val() !== undefined) {
                this.taLPORequirements = $('#taLPORequirements').val();
                if (this.itemLoaded) {
                    updateSPItem("Requirements", this.taLPORequirements);
                }
            }
        }
    };
    this.lbLPOCM = "";
    this.getLPOCM = function () { return this.lbLPOCM; };
    this.setLPOCM = function (v) {
        if (v !== undefined) {
            this.lbLPOCM = v;
            $('#lbLPOCM').val(this.lbLPOCM);
            if (this.itemLoaded) {
                updateSPItem("CommercialManager", this.lbLPOCM);
                // CM Deputy
                this.lookupCMDeputy = new lookupHelper();
                this.lookupCMDeputy.lookupField("Profiles", this.lbLPOCM, "Deputy");
            }
        }
    };
    this.lbLPOTM = "";
    this.getLPOTM = function () { return this.lbLPOTM; };
    this.setLPOTM = function (v) {
        if (v !== undefined) {
            this.lbLPOTM = v;
            $('#lbLPOTM').val(this.lbLPOTM);
            if (this.itemLoaded) {
                updateSPItem("ProposalManager", this.lbLPOTM);
            }
        }
    };
    this.lbLPOCMDeputy = "";
    this.getLPOCMDeputy = function () { return this.lbLPOCMDeputy; };
    this.setLPOCMDeputy = function (v) {
        if (v !== undefined) {
            this.lbLPOCMDeputy = v;
            $('#lbLPOCMDeputy').val(this.lbLPOCMDeputy);
            this.lbLPOCMDeputy = $('#lbLPOCMDeputy').val();
            if (this.itemLoaded) {
                updateSPItem("CommercialManagerDeputy", this.lbLPOCMDeputy);
            }
            
        }
    };
    this.txLPOInternalCost = 0;
    this.getLPOInternalCost = function () { return this.txLPOInternalCost; };
    this.setLPOInternalCost = function (v) {
        if (v !== undefined) {
            this.txLPOInternalCost = v;
            if (v !== null) {
                
                $('#txLPOInternalCost').val(this.txLPOInternalCost);
            } else if (this.txLPOInternalCost === null && $('#txLPOInternalCost').val() !== undefined && $('#txLPOInternalCost').val() !== "") {
                this.txLPOInternalCost = parseFloat($('#txLPOInternalCost').val());
                if (this.itemLoaded) {
                    updateSPItem("ProductionCostInternal", this.txLPOInternalCost);
                }
            }
            this.calculateCost();
        }
    };
    this.txLPOExternalCost = 0;
    this.getLPOExternalCost = function () { return this.txLPOExternalCost; };
    this.setLPOExternalCost = function (v) {
        if (v !== undefined) {
            this.txLPOExternalCost = v;
            if (v !== null) {                
                $('#txLPOExternalCost').val(this.txLPOExternalCost);
            } else if (this.txLPOExternalCost === null && $('#txLPOExternalCost').val() !== undefined && $('#txLPOExternalCost').val() !== "") {
                this.txLPOExternalCost = parseFloat($('#txLPOExternalCost').val());
                if (this.itemLoaded) {
                    updateSPItem("ProductionCostExternal", this.txLPOExternalCost);
                }
            }
            this.calculateCost();
        }
    };
    this.txLPOMaterialCost = 0;
    this.getLPOMaterialCost = function () { return this.txLPOMaterialCost; };
    this.setLPOMaterialCost = function (v) {
        if (v !== undefined) {
            this.txLPOMaterialCost = v;
            if (v !== null) {
                $('#txLPOMaterialCost').val(this.txLPOMaterialCost);
            } else if (this.txLPOMaterialCost === null && $('#txLPOMaterialCost').val() !== undefined && $('#txLPOMaterialCost').val() !== "") {
                this.txLPOMaterialCost = parseFloat($('#txLPOMaterialCost').val());
                if (this.itemLoaded) {
                    updateSPItem("Material", this.txLPOMaterialCost);
                }
            }
            this.calculateCost();
        }
    };
    this.lbLPOTotalCost = 0;
    this.getLPOTotalCost = function () { return this.lbLPOTotalCost; };
    this.setLPOTotalCost = function (v) {
        this.lbLPOTotalCost = parseFloat(v);
        $('#lbLPOTotalCost').val(this.lbLPOTotalCost)
        this.calculateMarge();
    };
    this.txLPOOfferPrice = 0;
    this.getLPOOfferPrice = function () { return this.txLPOOfferPrice; };
    this.setLPOOfferPrice = function (v) {
        if (v !== undefined) {
            this.txLPOOfferPrice = v;
            if (v !== null) {
                $('#txLPOOfferPrice').val(this.txLPOOfferPrice);
            } else if (this.txLPOOfferPrice === null && $('#txLPOOfferPrice').val() !== undefined && $('#txLPOOfferPrice').val() !== "") {
                this.txLPOOfferPrice = parseFloat($('#txLPOOfferPrice').val());
                if (this.itemLoaded) {
                    updateSPItem("Price", this.txLPOOfferPrice);
                }
            }
            this.calculateMarge();
        }
    };
    this.lbLPOMarge = "";
    this.getLPOMarge = function () { return this.lbLPOMarge; };
    this.setLPOMarge = function (v) {
        if (v !== undefined) {
            this.lbLPOMarge = v;
            $('#lbLPOMarge').val(this.lbLPOMarge);
            if (this.itemLoaded) {
                updateSPItem("MargePercentage", this.lbLPOMarge);
            }
        }
    };
    this.ddLPOTemplate = "";
    this.getLPOTemplate = function () { return this.ddLPOTemplate; };
    this.setLPOTemplate = function (v) {
        if (v !== undefined) {
            this.ddLPOTemplate = v;
            if (v !== null) {
                
                $('#ddLPOTemplate').val(this.ddLPOTemplate);
            } else if (this.ddLPOTemplate === null && $('#ddLPOTemplate').val() !== undefined) {
                this.ddLPOTemplate = $('#ddLPOTemplate').val();
                if (this.itemLoaded) {
                    updateSPItem("Template", this.ddLPOTemplate);
                }
            }
        }
    };
    this.cbLPOPolicy = "";
    this.getLPOPolicy = function () { return this.cbLPOPolicy; };
    this.setLPOPolicy = function (v) {
        if (v !== undefined) {
            this.cbLPOPolicy = v;
            if (v !== null) {
                
                $('#cbLPOPolicy').val(this.cbLPOPolicy);
            } else if (this.cbLPOPolicy === null && $('#cbLPOPolicy').val() !== undefined) {
                this.cbLPOPolicy = $('#cbLPOPolicy').val();
                if (this.itemLoaded) {
                    updateSPItem("AcknowledgePolicy", this.cbLPOPolicy);
                }
            }
        }
        // Button freischalten
    };
    this.lbLPOSentUser = "";
    this.getLPOSentUser = function () { return this.lbLPOSentUser; };
    this.setLPOSentUser = function (v) {
        if (v !== undefined) {
            this.lbLPOSentUser = v;
            if (v !== null) {
                
                $('#lbLPOSentUser').val(this.lbLPOSentUser);
            } else if (this.lbLPOSentUser === null && $('#lbLPOSentUser').val() !== undefined) {
                this.lbLPOSentUser = $('#lbLPOSentUser').val();
                if (this.itemLoaded) {
                    updateSPItem("TransmissionUser", this.lbLPOSentUser);
                }
            }
        }
    };
    this.lbLPOSentDate = "";
    this.getLPOSentDate = function () { return this.lbLPOSentDate; };
    this.setLPOSentDate = function (v) {
        if (v !== undefined) {
            this.lbLPOSentDate = v;
            if (v !== null) {
                
                $('#lbLPOSentDate').val(this.lbLPOSentDate);
            } else if (this.lbLPOSentDate === null && $('#lbLPOSentDate').val() !== undefined) {
                this.lbLPOSentDate = $('#lbLPOSentDate').val();
                if (this.itemLoaded) {
                    updateSPItem("TransmissionDate", this.lbLPOSentDate);
                }
            }
        }
    };
    this.txLPOProjectID = "";
    this.getLPOProjectID = function () { return this.txLPOProjectID; };
    this.setLPOProjectID = function (v) {
        if (v !== undefined) {
            this.txLPOProjectID = v;
            if (v !== null) {
                
                $('#txLPOProjectID').val(this.txLPOProjectID);
            } else if (this.txLPOProjectID === null && $('#txLPOProjectID').val() !== undefined) {
                this.txLPOProjectID = $('#txLPOProjectID').val();
                if (this.itemLoaded) {
                    updateSPItem("ProjectID", this.txLPOProjectID);
                }
            }
        }
    };
    this.ddLPOProjectType = "";
    this.getLPOProjectType = function () { return this.ddLPOProjectType; };
    this.setLPOProjectType = function (v) {
        if (v !== undefined) {
            this.ddLPOProjectType = v;
            if (v !== null) {
                
                $('#ddLPOProjectType').val(this.ddLPOProjectType);
            } else if (this.ddLPOProjectType === null && $('#ddLPOProjectType').val() !== undefined) {
                this.ddLPOProjectType = $('#ddLPOProjectType').val();
                if (this.itemLoaded) {
                    updateSPItem("ProjectType", this.ddLPOProjectType);
                }
            }
        }
    };
    this.ddLPOProjectLead = "";
    this.getLPOProjectLead = function () { return this.ddLPOProjectLead; };
    this.setLPOProjectLead = function (v) {
        if (v !== undefined) {
            this.ddLPOProjectLead = v;
            if (v !== null) {
                $('#ddLPOProjectLead').val(this.ddLPOProjectLead);
            } else if (this.ddLPOProjectLead === null && $('#ddLPOProjectLead').val() !== undefined) {
                this.ddLPOProjectLead = $('#ddLPOProjectLead').val();
                if (this.itemLoaded) {
                    updateSPItem("ProjectLead", this.ddLPOProjectLead);
                    // Cost Center
                    this.lookupCostCenter = new lookupHelper();
                    this.lookupCostCenter.lookupField("Profiles", ddLPOProjectLead, "CostCenter");
                }
            }
        }
    };
    this.txLPOCostCenter = "";
    this.getLPOCostCenter = function () { return this.txLPOCostCenter; };
    this.setLPOCostCenter = function (v) {
        if (v !== undefined) {
            this.txLPOCostCenter = v;
            if (v !== null) {
                
                $('#txLPOCostCenter').val(this.txLPOCostCenter);
            } else if (this.txLPOCostCenter === null && $('#txLPOCostCenter').val() !== undefined) {
                this.txLPOCostCenter = $('#txLPOCostCenter').val();
                if (this.itemLoaded) {
                    updateSPItem("CostCenter", this.txLPOCostCenter);
                }
            }
        }
    };
    this.lbLPOOrderCoordinator = "";
    this.getLPOOrderCoordinator = function () { return this.this.lbLPOOrderCoordinator; };
    this.setLPOOrderCoordinator = function (v) {
        if (v !== undefined) {
            this.lbLPOOrderCoordinator = v;
            if (v !== null) {
                
                $('#lbLPOOrderCoordinator').val(this.lbLPOOrderCoordinator);
            } else if (this.lbLPOOrderCoordinator === null && $('#lbLPOOrderCoordinator').val() !== undefined) {
                this.lbLPOOrderCoordinator = $('#lbLPOOrderCoordinator').val();
                if (this.itemLoaded) {
                    updateSPItem("OrderCoordinator", this.lbLPOOrderCoordinator);
                }
            }
        }
    };
    this.txLPOOrderNumber = "";
    this.getLPOOrderNumber = function () { return this.this.txLPOOrderNumber; };
    this.setLPOOrderNumber = function (v) {
        if (v !== undefined) {
            this.txLPOOrderNumber = v;
            if (v !== null) {
                $('#txLPOOrderNumber').val(this.txLPOOrderNumber);
            } else if (this.txLPOOrderNumber === null && $('#txLPOOrderNumber').val() !== undefined) {
                this.txLPOOrderNumber = $('#txLPOOrderNumber').val();
                if (this.itemLoaded) {
                    updateSPItem("OrderNumber", this.LPOOrderNumber);
                }
            }
        }
    };

    this.calculateCost = function () {
        this.totalCost = this.getLPOInternalCost() + this.getLPOExternalCost() + this.getLPOMaterialCost();
        this.setLPOTotalCost(this.totalCost);
    }
    this.calculateMarge = function () {
        var actMarge = "";
        if (this.getLPOTotalCost() > 0) {
            actMarge = Math.floor(((this.getLPOOfferPrice() / this.getLPOTotalCost()) - 1) * 100);
        }
        this.setLPOMarge(actMarge);
    }
}

