# routes/order_routes.py
# Defines all REST API endpoints for Orders.

from flask import Blueprint, request, jsonify
from services import order_service
from schemas.order_schema import order_to_dict, validate_order_request

# Create a Blueprint for order routes
order_bp = Blueprint("orders", __name__)


# ─────────────────────────────────────────────
# POST /api/orders
# Places a new order from the checkout page
# ─────────────────────────────────────────────
@order_bp.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Request body is required"}), 400

    # Validate the order data
    errors = validate_order_request(data)
    if errors:
        return jsonify({"message": "Validation failed", "errors": errors}), 400

    order = order_service.create_order(data)
    return jsonify(order_to_dict(order)), 201
