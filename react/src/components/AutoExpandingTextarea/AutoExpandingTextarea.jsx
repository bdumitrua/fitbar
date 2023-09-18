import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import "./AutoExpandingTextarea.scss";

function AutoExpandingTextarea({ name, placeholder }) {
    const { control, watch } = useForm();
    const value = watch(name);

    useEffect(() => {
        const textarea = document.querySelector(`[name="${name}"]`);
        textarea.style.height = "auto";
        let scHeight = textarea.scrollHeight;
        textarea.style.height = `${scHeight}px`;
    }, [name, value]);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <textarea
                    {...field}
                    className="modal-admin__description"
                    rows={1}
                    placeholder={placeholder}
                />
            )}
        />
    );
}

export default AutoExpandingTextarea;
