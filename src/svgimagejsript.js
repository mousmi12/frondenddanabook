import axios from 'axios';
import { BaseURL } from './Components/Masters/masterPagefunctions';


const getMenuImageStructure = async () => {
    try {
        const response = await axios.get(`https://confighub.${BaseURL}/api/v1/images`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Request failed with status:', response.status);
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export const reduceMenuData = async () => {
    const menuImage = await getMenuImageStructure();
    const images = {};

    const processedData = await Promise.all(menuImage.map(async (item) => {
        try {
            const image = await import(`../src/asset/Menusvg/main/${item.imagename}`);
            images[item.key] = image.default;
        } catch (error) {
            console.error(`Error importing image: ${item.key}`, error);
        }
        return { image: images[item.key], name: item.imagename };
    }));

    console.log('Processed Data:', processedData);
    console.log('Images:', images);

    return processedData;
};






