import { ExpertDetailCard } from "../components/ExpertDetailCard";
import expertsData from "../data/experts.json";

const ExpertPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    const expertId = parseInt(id, 10);

    const expert = expertsData.experts.find(
        (expert) => expert.id === expertId
    );

    if (!expert) {
        return <div>Expert not found</div>;
    }

    return <ExpertDetailCard expert={expert} />;
};

export default ExpertPage;

