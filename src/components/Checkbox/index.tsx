import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Checkbox({
    checked = false,
    text = "",
    onPress = () => {},
}: {
    checked: boolean;
    text?: string;
    onPress?: (value: boolean) => void;
}) {
    return (
        <BouncyCheckbox
            isChecked={checked}
            size={25}
            fillColor="#495e56"
            unFillColor="transparent"
            text={text}
            iconStyle={{ borderRadius: 4 }}
            innerIconStyle={{ borderRadius: 4 }}
            iconImageStyle={{ width: 12, height: 12, tintColor: "#ffffff" }}
            textStyle={{
                textDecorationLine: "none",
            }}
            onPress={onPress}
        />
    );
}
