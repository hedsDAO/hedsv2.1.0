export interface ConnectButtonProps {
	onClick?: Function;
	bg_color?: string;
	text_color?: string;
	bg_hover_color?: string;
	text_hover_color?: string;
	focus_ring_color?: string;
	font_weight?: string;
	children?: any;
}

export interface CustomButtonProps {
	color: string;
	disabled?: boolean;
	className?: string;
	onClick?: Function;
	children?: any;
}
