import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { LandingPageView } from "./LandingPage";
import * as React from "react";
import "./tailwind.out.css";

export class LandingPage implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private navigateTo = "";

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        context.mode.trackContainerResize(true);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(LandingPageView, {
            width: context.mode.allocatedWidth,
            height: context.mode.allocatedHeight,

            newHiresCount: context.parameters.NewHiresCount?.raw ?? 0,
            responsesCount: context.parameters.ResponsesCount?.raw ?? 0,
            buddyRate: context.parameters.BuddyRate?.raw ?? 0,
            exceptionsCount: context.parameters.ExceptionsCount?.raw ?? 0,

            currentWeek: context.parameters.CurrentWeek.raw ?? "",
            lastSync: context.parameters.LastSync.raw ?? "",

            onButtonClick: (value: string) => {
                this.navigateTo = value;
                this.notifyOutputChanged();

                // Reset after Canvas has read the value
                setTimeout(() => {
                    this.navigateTo = "";
                    this.notifyOutputChanged();
                }, 300);
            },
        });
    }

    public getOutputs(): IOutputs {
        return {
            NavigateTo: this.navigateTo
        };
    }

    public destroy(): void {
        // no-op
    }
}