import { useNavigate } from "react-router-dom";
import "./card-collection.less";

type Card = {
	id: number;
	title: string;
	description: string;
};

export function CardCollectionComponent() {
	const navigate = useNavigate();

	const cards: Card[] = [
		{
			id: 1,
			title: "Jira Feature",
			description: "Feature from Atlassian Jira.",
		},
		{
			id: 2,
			title: "Jira Feature",
			description: "Feature from Atlassian Jira.",
		},
		{
			id: 3,
			title: "Jira Feature",
			description: "Feature from Atlassian Jira.",
		},
		{
			id: 4,
			title: "Jira Feature",
			description: "Feature from Atlassian Jira.",
		},
		{
			id: 5,
			title: "Jira Feature",
			description: "Feature from Atlassian Jira.",
		},
		{
			id: 6,
			title: "Jira Feature",
			description: "Feature from Atlassian Jira.",
		},
	];

	return (
		<div className="card-component-container">
			{cards.map((card) => (
				<div
					key={card.id}
					className="card"
					onClick={() => navigate("/template/new")}
				>
					<div className="circle"></div>
					<div className="text-container">
						<h3>{card.title}</h3>
						<p>{card.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
