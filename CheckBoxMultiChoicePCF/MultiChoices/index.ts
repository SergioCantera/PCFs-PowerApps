import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MultiCheckBox, MultiCheckBoxProps, AvailableOption} from './components/MultiCheckBox';

export class MultiChoices implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /*private mockData:AvailableOption[] = [
        {label: "Opción 1", value:1},
        {label: "Opción 2", value:2},
        {label: "Opción 3", value:3},
        {label: "Opción 4", value:4},
    ]*/

    private _context:ComponentFramework.Context<IInputs>;
    private _container:HTMLDivElement;
    private _notifyOutputChanged:()=>void;
    
    private _availableOptions: AvailableOption[] = [] ;
    private _selectedOptions: number[];
    private _props:MultiCheckBoxProps

    private handleOptionsChange(selectedOptions: number[]) {
        this._selectedOptions = selectedOptions;
        this._notifyOutputChanged()
    }

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._context = context;
        this._container= container;
        this._notifyOutputChanged = notifyOutputChanged;
        // Store values currently selected in the field
        this._selectedOptions = this._context.parameters.controlValue.raw || [];
        
        // Create a select option for each option specified by the target OptionSet and add it to array
        (context.parameters.controlValue as ComponentFramework.PropertyTypes.MultiSelectOptionSetProperty).attributes?.Options.forEach(option => {
            const availableOption:AvailableOption = {
                label: option.Label,
                value: option.Value
            };
            this._availableOptions.push(availableOption)
        });

        //this._availableOptions = this.mockData;
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this._props = {
            availableOptions: this._availableOptions,
            selectedOptions: this._selectedOptions,
            handleChange: this.handleOptionsChange.bind(this)
        }

        ReactDOM.render(
            React.createElement(
                MultiCheckBox, this._props 
            ),
            this._container
        )
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return { controlValue: this._selectedOptions};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
        ReactDOM.unmountComponentAtNode(this._container)
    }
}
