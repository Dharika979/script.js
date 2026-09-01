from flask import Blueprint, request, jsonify
from services import product_service
from schemas.product_schema import product_to_dict, validate_product_request
from exceptions.resource_not_found import ResourceNotFoundException

# Create a Blueprint for product routes.
# Blueprint groups related routes together.
product_bp = Blueprint("products", __name__)


# ─────────────────────────────────────────────
# GET /api/products
# Returns a list of all products
# ─────────────────────────────────────────────
@product_bp.route("/api/products", methods=["GET"])
def get_all_products():
    products = product_service.get_all_products()
    return jsonify([product_to_dict(p) for p in products]), 200


# ─────────────────────────────────────────────
# GET /api/products/search?keyword=bamboo
# Searches products by name keyword
# IMPORTANT: Must be defined BEFORE /api/products/<int:id>
# ─────────────────────────────────────────────
