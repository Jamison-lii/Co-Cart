import React from 'react';
import { 
  Users, 
  Package, 
  Truck, 
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  Tag,
  Globe,
  HeartHandshake
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {

  const navigate  = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shop Smarter, <span className="text-red-500">Together</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Buy Together is revolutionizing shopping by harnessing the power of collective buying to save you money on every purchase.
        </p>
      </section>

      {/* Problem Section */}
      <section className="mb-20 bg-gray-50 rounded-xl p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShoppingCart className="mr-2 text-red-500" size={24} />
            The Problem: Why Buying Alone Costs More
          </h2>
          <p className="text-gray-700 mb-6">
            Shopping for high-quality products shouldn't break the bank—but it often does. When buying individually, you miss out on:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Tag size={20} className="text-red-500" />, text: "Bulk discounts – Retailers offer better prices for larger orders" },
              { icon: <Truck size={20} className="text-red-500" />, text: "Lower shipping costs – Split fees among multiple buyers" },
              { icon: <Globe size={20} className="text-red-500" />, text: "Access to premium deals only available in quantity" },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-3 mt-1">{item.icon}</div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HeartHandshake className="mr-2 text-red-500" size={24} />
            The Solution: Collective Shopping Power
          </h2>
          <p className="text-gray-700 mb-8">
            Buy Together is a collaborative shopping platform that empowers consumers to:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Users size={32} className="text-red-500" />,
                title: "Create or Join Group Purchases",
                description: "Start a buying group for any product or join existing ones to instantly save money."
              },
              {
                icon: <Package size={32} className="text-red-500" />,
                title: "Unlock Bulk Discounts",
                description: "Pool funds with others to qualify for wholesale pricing on your favorite products."
              },
              {
                icon: <Truck size={32} className="text-red-500" />,
                title: "Shared Shipping Savings",
                description: "Split delivery costs so everyone pays less for shipping."
              },
              {
                icon: <ShieldCheck size={32} className="text-red-500" />,
                title: "Secure Transactions",
                description: "Escrow-based payments ensure money is only released when orders are confirmed."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-red-50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Buy Together Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Browse or Create",
                description: "Find an existing group buy or start your own for any product"
              },
              {
                step: "2",
                title: "Invite Others",
                description: "Share your group buy link to gather participants"
              },
              {
                step: "3",
                title: "Save Together",
                description: "Once the group reaches critical mass, everyone gets the discount"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Saving?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of smart shoppers who are already benefiting from collective buying power.
        </p>
        <button onClick={()=>{navigate('/campaigns')}} className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center transition-colors">
         Join a Group Buying Campaign <ArrowRight className="ml-2" size={18} />
        </button>
      </section>
    </div>
  );
};

export default AboutPage;