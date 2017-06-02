using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Runtime.Serialization;
using Microsoft.SharePoint.Phone.Application;
using Microsoft.SharePoint.Client;
using System.Collections.ObjectModel;

namespace LPO_Phone
{
    [DataContract]
    public class DesignNewItemViewModel : NewItemViewModelBase
    {
        /// <summary>
        /// Provides new item values for fields of the List, given its name. Also used for data binding to New form UI
        /// </summary>
        public DesignNewItemViewModel()
        {

            //Title
            this["Title"] = "Sample Text";

            //ContactCp
            this["ContactCp"] = "Sample Text";

            //CustomerCp
            this["CustomerCp"] = "Sample Text";

            //Activity
            this["Activity"] = new ObservableCollection<ChoiceFieldViewModel>
                                                            { 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = true }, 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = false }, 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = false }
                                                            };

            //EstimatedOrderVolume
            this["EstimatedOrderVolume"] = "$123";

            //Deadline
            this["Deadline"] = "1/21/2012";

            //EstProjectStart
            this["EstProjectStart"] = "1/21/2012";

            //EstProjectEnd
            this["EstProjectEnd"] = "1/21/2012";

            //Language1
            this["Language1"] = new ObservableCollection<ChoiceFieldViewModel>
                                                            { 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = true }, 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = false }, 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = false }
                                                            };

            //Requirements
            this["Requirements"] = "This is a multiline text field";

            //LPOStatus
            this["LPOStatus"] = "Sample Text";

            //ProposalManager
            this["ProposalManager"] = new UserFieldViewModel { TitleInternal = "John Doe" };

            //CMcp
            this["CMcp"] = "Sample Text";

            //CommercialManagerDeputy
            this["CommercialManagerDeputy"] = "Sample Text";

            //RiskClassification
            this["RiskClassification"] = new ObservableCollection<ChoiceFieldViewModel>
                                                            { 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = true }, 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = false }, 
                                                                new ChoiceFieldViewModel { Name = "Option 1", IsChecked = false }
                                                            };

            //NonDisclosure
            this["NonDisclosure"] = true;

            //ProductionCostInternal
            this["ProductionCostInternal"] = "$123";

            //ProductionCostExternal
            this["ProductionCostExternal"] = "$123";

            //Material
            this["Material"] = "$123";

            //TotalCost
            this["TotalCost"] = "$123";

            //Price
            this["Price"] = "$123";

            //MargePercentage
            this["MargePercentage"] = "99.5";

            //AcknowledgePolicy
            this["AcknowledgePolicy"] = true;

            //EMail
            this["EMail"] = "Sample Text";

            //Attachments
            this["Attachments"] = new ObservableCollection<AttachmentFieldViewModel>
                                                            { 
                                                                new AttachmentFieldViewModel { Name = "FileName1.txt", IsChecked = true },
                                                                new AttachmentFieldViewModel { Name = "Picture1.jpg", IsChecked = true }, 
                                                                new AttachmentFieldViewModel { Name = "Test.docx", IsChecked = true }
                                                            };

            //TransmissionDate
            this["TransmissionDate"] = "Sample Text";

            //TransmissionUser
            this["TransmissionUser"] = "Sample Text";

            //OrderCoordinator
            this["OrderCoordinator"] = new UserFieldViewModel { TitleInternal = "John Doe" };

            //NoteToOrderManagement
            this["NoteToOrderManagement"] = "This is a multiline text field";

            //ContactImage
            this["ContactImage"] = "Sample Text";

            //CustomerLogo
            this["CustomerLogo"] = "Sample Text";

        }


        /// <summary>
        /// Provides display values for fields of the List, given its name. Also used for data binding to New form UI
        /// </summary>
        /// <param name="fieldName" />
        /// <returns />
        public override object this[string fieldName]
        {
            get
            {
                return base[fieldName];
            }
            set
            {
                base[fieldName] = value;
            }
        }
    }
}
