import { faTruck, faRotate, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductFeatures() {
  const features = [
    {
      icon: <FontAwesomeIcon icon={faTruck} className="w-6 h-6" />,
      title: "Free Delivery",
      description: "Orders over 550",
      color: "text-green-600",
    },
    {
      icon: <FontAwesomeIcon icon={faRotate} className="w-6 h-6" />,
      title: "30 Days Return",
      description: "Money back",
      color: "text-green-600",
    },
    {
      icon: <FontAwesomeIcon icon={faLock} className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% Protected",
      color: "text-green-600",
    },
  ];

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={`${feature.color} shrink-0`}>{feature.icon}</div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900">
              {feature.title}
            </h4>
            <p className="text-xs text-gray-500">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
