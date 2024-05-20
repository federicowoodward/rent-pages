import { useSnackbar } from 'notistack';

const useAlert = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleAlert = (variant, message) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
        });
    };

    return { handleAlert };
};

export default useAlert;
