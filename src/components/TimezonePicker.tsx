'use client'

import {useState} from "react";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

export type ZoneOption = {
    timeZone: string;
    /** e.g. "Dhaka (UTC+6)" */
    label: string;
};

type TimezonePickerProps = {
    label: string;
    value: string;
    options: ZoneOption[];
    onChange: (timeZone: string) => void;
};

// Rendering all ~420 zones at once makes typing sluggish; a search narrows it down anyway
const MAX_RESULTS = 60;

export default function TimezonePicker({label, value, options, onChange}: TimezonePickerProps) {
    const [query, setQuery] = useState("");
    const selected = options.find(option => option.timeZone === value) ?? null;

    const needle = query.trim().toLowerCase().replace(/\s+/g, "_");
    const results = (needle
            ? options.filter(o => `${o.timeZone} ${o.label.replace(/\s+/g, "_")}`.toLowerCase().includes(needle))
            : options
    ).slice(0, MAX_RESULTS);

    return (
        <Field className="min-w-0">
            <Label className="mb-1.5 block text-xs font-medium text-subtle">{label}</Label>
            <Combobox
                value={selected}
                by="timeZone"
                onChange={option => option && onChange(option.timeZone)}
                onClose={() => setQuery("")}
            >
                <div className="relative">
                    <ComboboxInput
                        className="w-full rounded-lg border border-line bg-background py-2 pl-3 pr-9 text-sm text-foreground placeholder:text-subtle focus:border-accent focus:outline-none"
                        displayValue={(option: ZoneOption | null) => option?.label ?? ""}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Search a city or zone"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2 text-subtle hover:text-foreground">
                        <ChevronUpDownIcon aria-hidden="true" className="size-5"/>
                    </ComboboxButton>
                </div>
                <ComboboxOptions
                    anchor="bottom start"
                    className="z-20 max-h-72 w-(--input-width) min-w-64 overflow-y-auto rounded-xl border border-line-strong bg-surface p-1.5 shadow-2xl shadow-black/50 [--anchor-gap:0.375rem] empty:invisible"
                >
                    {results.map(option => (
                        <ComboboxOption
                            key={option.timeZone}
                            value={option}
                            className="group flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm data-focus:bg-white/10"
                        >
                            <CheckIcon aria-hidden="true" className="invisible size-4 shrink-0 text-accent group-data-selected:visible"/>
                            <span className="min-w-0">
                                <span className="block truncate text-foreground">{option.label}</span>
                                <span className="block truncate font-mono text-xs text-subtle">{option.timeZone}</span>
                            </span>
                        </ComboboxOption>
                    ))}
                    {needle && results.length === 0 && (
                        <p className="px-2.5 py-2 text-sm text-subtle">No matching time zones</p>
                    )}
                </ComboboxOptions>
            </Combobox>
        </Field>
    );
}
