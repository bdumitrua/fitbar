import { createContext, useContext } from "react";

const MainContext = createContext();

export const useMainContext = () => {
    return useContext(MainContext);
};

export const MainProvider = ({ children }) => {
    const formatDate = (dateString) => {
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

    const contextValue = {
        formatDate,
    };

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    );
};
