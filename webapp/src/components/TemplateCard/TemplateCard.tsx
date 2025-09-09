import { useNavigate } from "react-router-dom";
import "./TemplateCard.less";

type Card = {
	id: number;
	title: string;
	description: string;
};

export function TemplateCard() {
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
		<div className="templatecard-container">
			<div className="inner-container">
				{cards.map((card) => (
					<div key={card.id} className="card">
						<div className="circle"></div>
						<div className="text-container">
							<h3>{card.title}</h3>
							<p>{card.description}</p>
						</div>
					</div>
				))}
			</div>
			{/* should this be a component?? */}
			<div className="button-container">
				<button onClick={() => navigate("/template/new")}>+ New Template</button>
			</div>
		</div>
	);
}
